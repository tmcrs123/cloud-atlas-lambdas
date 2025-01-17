import { Context, Handler, SNSEvent } from "aws-lambda";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

type BucketActions =
  | "ADD_DUMP"
  | "REMOVE_DUMP"
  | "ADD_OPTIMIZED"
  | "REMOVE_OPTIMIZED";
type BucketActionMessage = {
  action: BucketActions;
  mapId: string;
  markerId: string;
  imageId: string;
};

const queueUrl =
  "http://sqs.us-east-1.localstack:4566/000000000000/snappin-queue";

const sqsClient = new SQSClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  endpoint: "http://localhost:4566",
});

const lambdaClient = new LambdaClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  endpoint: "http://localhost:4566",
});

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
});

export const handler: Handler = async (event: SNSEvent, context: Context) => {
  const message: BucketActionMessage = JSON.parse(event.Records[0].Sns.Message);

  switch (message.action) {
    case "ADD_DUMP":
      //invoke process image
      const invokeCommand = new InvokeCommand({
        FunctionName: "snappin-process-image",
        InvocationType: "Event",
        Payload: Buffer.from(JSON.stringify(message)),
      });
      lambdaClient.send(invokeCommand);
      break;
    case "REMOVE_DUMP":
      // do nothing
      break;
    case "ADD_OPTIMIZED":
      const sendMessageCommand = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify({
          mapId: message.mapId,
          markerId: message.markerId,
          imageId: message.imageId,
        }),
      });
      sqsClient.send(sendMessageCommand);
      //push to SQS
      break;
    case "REMOVE_OPTIMIZED":
      // remove from s3
      const deleteImageFromDumpBucket = new DeleteObjectCommand({
        Bucket: "snappin-dump",
        Key: `${message.mapId}/${message.markerId}/${message.imageId}`,
      });

      s3Client.send(deleteImageFromDumpBucket);
      break;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Successfully handled action ${message.action} for mapId ${message.mapId}, markerId ${message.markerId}, imageId: ${message.imageId}`,
    }),
  };
};
