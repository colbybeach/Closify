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
      KeyConditionExpression: "PK = :experienceValue",
      ExpressionAttributeValues: {
        ":experienceValue": { S: "experience" },
      },
      ProjectionExpression: "#experience, #dates, #description, #images",
      ExpressionAttributeNames: {
        "#experience": "SK", // Rename 'sk' to 'skill'
        "#dates": "dates",
        "#description": "description",
        "#images": "images",
      },
    });

    // Query DynamoDB for climbs
    const result = await client.send(command);

    // Transform the response to remove attribute types
    const transformedItems = result.Items?.map((item) => ({
      experience: item.SK.S,
      dates: item.dates.S,
      description: item.description.S,
      images: item.images.L?.map((image) => image.S), // Unmarshal list of strings
    }));


    return res.json(transformedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
