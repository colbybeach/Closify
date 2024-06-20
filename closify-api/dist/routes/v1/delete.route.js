"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const express_1 = require("express");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const router = (0, express_1.Router)();
// Endpoint to get the leaderboard for a given period
router.get("/", async (req, res) => {
    const { SK } = req.body;
    if (!SK) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const command = new client_dynamodb_1.DeleteItemCommand({
            TableName: "closify-db",
            Key: {
                "PK": { S: (req && req.userId) ? req.userId : "0" },
                "SK": { S: SK }
            },
        });
        // Delete DynamoDB item
        await db_1.client.send(command);
        return res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.default = router;
