import { client } from "../../db";
import { Router } from "express";
import {
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { RequestWithUser } from "../../middleware";

const router = Router();

// Endpoint to get the leaderboard for a given period
router.get("/", async (req: RequestWithUser, res) => {
  const { SK, attributeName, attributeValue } = req.body;

  if (!SK || !attributeName || !attributeValue) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const command = new UpdateItemCommand({
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
    const result = await client.send(command);

    return res.json(result.Attributes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
