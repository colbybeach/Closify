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
            KeyConditionExpression: "PK = :skillValue",
            ExpressionAttributeValues: {
                ":skillValue": { S: "skill" },
            },
            ProjectionExpression: "#skill, #level, #category, #image",
            ExpressionAttributeNames: {
                "#skill": "SK",
                "#level": "level",
                "#category": "category",
                "#image": "image",
            },
        });
        // Query DynamoDB for climbs
        const result = await db_1.client.send(command);
        // Transform the response to remove attribute types
        const transformedItems = result.Items?.map((item) => ({
            skill: item.SK.S,
            level: item.level.S,
            category: item.category.S,
            image: item.image.S,
        }));
        // Group transformed items by category
        const itemsByCategory = {};
        transformedItems?.forEach((item) => {
            if (!itemsByCategory[item.category || ""]) {
                itemsByCategory[item.category || ""] = [];
            }
            itemsByCategory[item.category || ""].push(item);
        });
        // Respond with the grouped JSON data
        return res.json(itemsByCategory);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
