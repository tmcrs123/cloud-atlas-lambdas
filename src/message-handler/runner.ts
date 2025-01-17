import { SNSEvent } from "aws-lambda";
import { handler } from ".";

handler(
  {
    Records: [
      {
        EventSource: "aws:sns",
        EventVersion: "1.0",
        EventSubscriptionArn: "arn:aws:sns:EXAMPLE",
        Sns: {
          Type: "Notification",
          MessageId: "example-id",
          TopicArn: "arn:aws:sns:EXAMPLE",
          Subject: "example subject",
          Message:
            '{"action":"REMOVE_OPTIMIZED","mapId":"345345sbnfgng-23243-bsrse1","markerId":"sergser9serg-rgserg-sergserg2","imageId":"bse7234gsh345-nsrth547ndrg-w4w3bfh546"}',
          Timestamp: new Date().toISOString(),
          SignatureVersion: "1",
          Signature: "EXAMPLE",
          SigningCertUrl: "EXAMPLE",
          UnsubscribeUrl: "EXAMPLE",
          MessageAttributes: {},
        },
      },
    ],
  } as SNSEvent,
  {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "",
    functionVersion: "",
    invokedFunctionArn: "",
    memoryLimitInMB: "",
    awsRequestId: "",
    logGroupName: "",
    logStreamName: "",
    getRemainingTimeInMillis: function (): number {
      throw new Error("Function not implemented.");
    },
    done: function (error?: Error, result?: any): void {
      throw new Error("Function not implemented.");
    },
    fail: function (error: Error | string): void {
      throw new Error("Function not implemented.");
    },
    succeed: function (messageOrObject: any): void {
      throw new Error("Function not implemented.");
    },
  },
  () => {
    console.log("handler finished");
  }
);
