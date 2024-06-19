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
            TableName: "colbybeach.com",
            KeyConditionExpression: "PK = :projectValue",
            ExpressionAttributeValues: {
                ":projectValue": { S: "project" },
            },
            ProjectionExpression: "#project, #dates, #description, #images",
            ExpressionAttributeNames: {
                "#project": "SK",
                "#dates": "dates",
                "#description": "description",
                "#images": "images",
            },
        });
        // Query DynamoDB for climbs
        const result = await db_1.client.send(command);
        // Transform the response to remove attribute types
        const transformedItems = result.Items?.map((item) => ({
            project: item.SK.S,
            dates: item.dates.S,
            description: item.description.S,
            images: item.images.L?.map((image) => image.S), // Unmarshal list of strings
        }));
        return res.json(transformedItems);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
