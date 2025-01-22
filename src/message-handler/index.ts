import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

type KnowObjectActions =
  | "ObjectCreated:Put"
  | "ObjectCreated:Post"
  | "ObjectRemoved:Delete";

function isKnowObjectAction(value: string): value is KnowObjectActions {
  return (
    value === "ObjectCreated:Put" ||
    value === "ObjectCreated:Post" ||
    value === "ObjectRemoved:Delete"
  );
}

const queueUrl = process.env.QUEUE_URL;

const sqsClient = new SQSClient({
  region: process.env.REGION,
  ...(process.env.NODE_ENV === "local" && {
    endpoint: process.env.LOCAL_ENDPOINT,
  }),
});

const lambdaClient = new LambdaClient({
  region: process.env.REGION,
  ...(process.env.NODE_ENV === "local" && {
    endpoint: process.env.LOCAL_ENDPOINT,
  }),
});

const s3Client = new S3Client({
  region: process.env.REGION,
  forcePathStyle: true,
  ...(process.env.NODE_ENV === "local" && {
    endpoint: process.env.LOCAL_ENDPOINT,
  }),
});

type snsS3Message = {
  awsRegion: string;
  eventName: string;
  s3: {
    bucket: { name: string };
    object: { key: string };
  };
};

export const handler = async (event: any, context: any) => {
  console.log(event);
  console.log(context);
  const message: snsS3Message = JSON.parse(event.Records[0].Sns.Message)
    .Records[0];

  const key = message.s3.object.key;
  const [mapId, markerId, imageId] = message.s3.object.key.split("/");

  if (!isKnowObjectAction(message.eventName)) {
    throw new Error(`${message.eventName} is not a known event.`);
  }

  if (message.s3.bucket.name === process.env.DUMP_BUCKET_NAME) {
    console.log("in dump bucket land");
    switch (message.eventName) {
      case "ObjectCreated:Put":
      case "ObjectCreated:Post":
        console.log("obj created");
        const invokeCommand = new InvokeCommand({
          FunctionName: process.env.PROCESS_IMAGE_FN_NAME,
          InvocationType: "Event",
          Payload: Buffer.from(
            JSON.stringify({ key, mapId, markerId, imageId })
          ),
        });
        await lambdaClient.send(invokeCommand);
        break;
      case "ObjectRemoved:Delete":
        console.log("obj created");

        break;
      default:
        break;
    }
  } else {
    console.log("optimized bucker");
    switch (message.eventName) {
      // optimized bucket
      case "ObjectCreated:Put":
      case "ObjectCreated:Post":
        console.log("obj created");
        const sendMessageCommand = new SendMessageCommand({
          QueueUrl: queueUrl,
          MessageBody: JSON.stringify({
            key,
            mapId,
            markerId,
            imageId,
          }),
        });
        await sqsClient.send(sendMessageCommand);
        break;
      case "ObjectRemoved:Delete":
        console.log("obj deleted");

        break;
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully handled action ${message.eventName}-${message.s3.bucket.name} for mapId ${mapId}, markerId ${markerId}, imageId: ${imageId}`,
    }),
  };
};
