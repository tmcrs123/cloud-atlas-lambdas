import { handler } from ".";

handler(
  { Key: "test_image.jpg", atlasId: "1", imageId: "1", markerId: "1" },
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
