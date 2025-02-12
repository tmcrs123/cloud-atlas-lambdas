import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
export const handler = async (_event: unknown) => {
  const DIST_ID = process.env.DISTRIBUTION_ID;

  const client = new CloudFrontClient();

  const command = new CreateInvalidationCommand({
    DistributionId: DIST_ID,
    InvalidationBatch: {
      CallerReference: "" + new Date().getTime(),
      Paths: {
        Quantity: 1,
        Items: ["/*"],
      },
    },
  });

  await client.send(command);

  const response = {
    statusCode: 200,
    body: JSON.stringify("Finished creating cloudfront cache invalidation"),
  };
  return response;
};
