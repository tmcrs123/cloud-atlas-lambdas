import { handler } from ".";

handler(
  {
    Records: [
      {
        EventSource: "aws:sns",
        EventVersion: "1.0",
        EventSubscriptionArn:
          "arn:aws:sns:us-east-1:891376964515:snappin-test-bucket-events-topic:f37414af-7a44-496b-be49-4746bda93e31",
        Sns: {
          Type: "Notification",
          MessageId: "1f49e7bf-a373-5ca2-bdc9-87b6d87d6710",
          TopicArn:
            "arn:aws:sns:us-east-1:891376964515:snappin-test-bucket-events-topic",
          Subject: "Amazon S3 Notification",
          Message:
            '{"Records":[{"eventVersion":"2.1","eventSource":"aws:s3","awsRegion":"us-east-1","eventTime":"2025-01-21T10:37:01.506Z","eventName":"ObjectCreated:Put","userIdentity":{"principalId":"AWS:AIDA47CRVCORQXO5QCUEP"},"requestParameters":{"sourceIPAddress":"79.168.57.193"},"responseElements":{"x-amz-request-id":"NTP9GBT3RCBWMX86","x-amz-id-2":"/oSfBo2VgEH625Fas7SbBfghnN/5kMOEq+hRyD7IUA60BEMfwnZUbYdwlXAcBe0GqJcuKoBSQf4yXMdb3N5QwpLb8DpV2dxAuEtlvSGyHeE="},"s3":{"s3SchemaVersion":"1.0","configurationId":"YzA1YjhkMDEtNmU2NS00NTNlLTk2Y2UtY2E1MTVmNDczNzI5","bucket":{"name":"snappin-test-dump","ownerIdentity":{"principalId":"A607X4P163S71"},"arn":"arn:aws:s3:::snappin-test-dump"},"object":{"key":"waegaw12312/uihui3453/bananas.jpg","size":9843819,"eTag":"6e59fce2fa4568c35032441ac43d05f7","sequencer":"00678F78CD256C4BDF"}}}]}',
          Timestamp: "2025-01-21T10:37:02.396Z",
          SignatureVersion: "1",
          Signature:
            "HpTZp1qt0xtDe0SAqbbddbPa6XDbD3i3jrhvAr5PwuR9+paO4K6CoaqKoYCgmnhNOhQrFnYCqPxWemZvYJYUoDMYyDIeacs11/Bzudt115EgT9JErWFi8GbuMoePPemDrvy7bEaXxSi+tS7qZNTsILAC2ACnZNSoKiP4VArXTlQvRpmFTQUwh1ouYIO0uXFjOqdwAtYGiEsWrwuKFeuzE1Rf65lh6kzwaIkSvziZyBj+NerrZUKfQlJJpln923gbh76mAcmAL1beZ2FIxXSYjJelnHWtSRAPPB+k8eNJ1YsMmJrHs+rJnSD4cRNj/f9W545bCZ/g/yufwvmMGeI92Q==",
          SigningCertUrl:
            "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-9c6465fa7f48f5cacd23014631ec1136.pem",
          UnsubscribeUrl:
            "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:891376964515:snappin-test-bucket-events-topic:f37414af-7a44-496b-be49-4746bda93e31",
          MessageAttributes: {},
        },
      },
    ],
  },
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
