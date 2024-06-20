"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = require("express");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const router = (0, express_1.Router)();
// Endpoint to get the leaderboard for a given period
router.get("/", async (req, res) => {
    try {
        const command = new client_dynamodb_1.QueryCommand({
            TableName: "closify-db",
            KeyConditionExpression: "PK = :clothingValue",
            ExpressionAttributeValues: {
                ":clothingValue": { S: ((req && req.userId) ? req.userId : "0") },
            },
            ProjectionExpression: "#type, #name, #image, #location, #clean",
            ExpressionAttributeNames: {
                "#name": "SK", // Rename 'sk' to 'skill'
                "#type": "type",
                "#image": "image",
                "#location": "location",
                "#clean": "clean",
            },
        });
        // Query DynamoDB for climbs
        const result = await db_1.client.send(command);
        // Transform the response to remove attribute types
        const transformedItems = result.Items?.map((item) => ({
            name: item.SK.S,
            type: item.type.S,
            image: item.image.S,
            location: item.location.S,
            clean: item.clean.S
        }));
        return res.json(transformedItems);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
