"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = require("express");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const router = (0, express_1.Router)();
// Endpoint to get the leaderboard for a given period
router.get("/", async (req, res) => {
    const { SK, type, image, location, clean } = req.body;
    if (!SK || !type || !image || !location || !clean) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const command = new client_dynamodb_1.PutItemCommand({
            TableName: "closify-db",
            Item: {
                "PK": { S: (req && req.userId) ? req.userId : "0" },
                "SK": { S: SK },
                "type": { S: type },
                "image": { S: image },
                "location": { S: location },
                "clean": { S: clean },
            }
        });
        // Create DynamoDB item
        await db_1.client.send(command);
        return res.status(201).json({ message: "Item created successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
