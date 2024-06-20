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
      TableName: "closify-db",
      KeyConditionExpression: "PK = :clothingValue",
      ExpressionAttributeValues: {
        ":clothingValue": { S: ((req && req.userId) ? req.userId : "0") },
      },
      ProjectionExpression: "#type, #name, #image, #location, #clean",
      ExpressionAttributeNames: {
        "#name": "SK", // Rename 'sk' to 'skill'
        "#type": "type",
        "#image": "image",
        "#location": "location",
        "#clean": "clean",
      },
    });

    // Query DynamoDB for climbs
    const result = await client.send(command);

    // Transform the response to remove attribute types
    const transformedItems = result.Items?.map((item) => ({
      name: item.SK.S,
      type: item.type.S,
      image: item.image.S,
      location: item.location.S,
      clean: item.clean.BOOL
    }));


    return res.json(transformedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
});

export default router;
