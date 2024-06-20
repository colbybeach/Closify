import { client } from "../../db";
import { Router } from "express";
import {
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { RequestWithUser } from "../../middleware";

const router = Router();

// Endpoint to get the leaderboard for a given period
router.get("/", async (req: RequestWithUser, res) => {
  
  const { SK, type, image, location, clean } = req.body;

  if (!SK || !type || !image || !location || !clean) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const command = new PutItemCommand({
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
    await client.send(command);

    return res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
