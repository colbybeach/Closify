"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = require("express");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const router = (0, express_1.Router)();
// Endpoint to get the leaderboard for a given period
router.get("/", async (req, res) => {
    const { SK, attributeName, attributeValue } = req.body;
    if (!SK || !attributeName || !attributeValue) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const command = new client_dynamodb_1.UpdateItemCommand({
            TableName: "closify-db",
            Key: {
                "PK": { S: (req && req.userId) ? req.userId : "0" },
                "SK": { S: SK }
            },
            UpdateExpression: `set #attrName = :attrValue`,
            ExpressionAttributeNames: {
                "#attrName": attributeName,
            },
            ExpressionAttributeValues: {
                ":attrValue": { S: attributeValue },
            },
            ReturnValues: "UPDATED_NEW",
        });
        // Update DynamoDB item
        const result = await db_1.client.send(command);
        return res.json(result.Attributes);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
