import { client } from "../../db";
import { Router } from "express";
import {
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { RequestWithUser } from "../../middleware";

const router = Router();

// Endpoint to get the leaderboard for a given period
router.get("/", async (req: RequestWithUser, res) => {
  try {
    const command = new QueryCommand({
      TableName: "colbybeach.com",
      KeyConditionExpression: "PK = :skillValue",
      ExpressionAttributeValues: {
        ":skillValue": { S: "skill" },
      },
      ProjectionExpression: "#skill, #level, #category, #image",
      ExpressionAttributeNames: {
        "#skill": "SK", // Rename 'sk' to 'skill'
        "#level": "level",
        "#category": "category",
        "#image": "image",
      },
    });

    // Query DynamoDB for climbs
    const result = await client.send(command);

    // Transform the response to remove attribute types
    const transformedItems = result.Items?.map((item) => ({
      skill: item.SK.S,
      level: item.level.S,
      category: item.category.S,
      image: item.image.S,
    }));

    // Group transformed items by category
    const itemsByCategory: { [key: string]: any[] } = {};
    transformedItems?.forEach((item) => {
      if (!itemsByCategory[item.category || ""]) {
        itemsByCategory[item.category || ""] = [];
      }
      itemsByCategory[item.category || ""].push(item);
    });

    // Respond with the grouped JSON data
    return res.json(itemsByCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
