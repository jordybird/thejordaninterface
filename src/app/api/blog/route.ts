import { NextResponse } from 'next/server';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const handleDynamoDBError = (error: any) => {
  console.error('DynamoDB Error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
};

export async function GET() {
  const params = {
    TableName: process.env.BLOG_TABLE_NAME || 'BlogPosts', // Table name
  };

  try {
    // Use ScanCommand to retrieve all items in the table
    const command = new ScanCommand(params);
    const result = await client.send(command);

    // If no items are returned, send an empty response
    if (!result.Items) {
      return NextResponse.json([], { status: 200 });
    }

    // Unmarshall and format the items
    const blogPosts = result.Items.map((item) => {
      const unmarshalled = unmarshall(item);
      return {
        PostID: unmarshalled.PostID,
        title: unmarshalled.Title || 'Untitled', // Transform to lowercase
        date: unmarshalled.Date || new Date().toISOString(), // Ensure date is in ISO format
        // Add other fields as necessary
      };
    });

    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error: any) {
    return handleDynamoDBError(error);
  }
}
