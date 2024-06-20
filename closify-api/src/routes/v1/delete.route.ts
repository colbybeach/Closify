import { client } from "../../db";
import { Router } from "express";
import {
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { RequestWithUser } from "../../middleware";

const router = Router();

// Endpoint to get the leaderboard for a given period
router.get("/", async (req: RequestWithUser, res) => {
    
  const { SK } = req.body;

  if (!SK) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const command = new DeleteItemCommand({
      TableName: "closify-db",
      Key: {
        "PK": { S: (req && req.userId) ? req.userId : "0" },
        "SK": { S: SK }
      },
    });

    // Delete DynamoDB item
    await client.send(command);

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
