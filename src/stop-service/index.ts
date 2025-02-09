import { ECSClient, UpdateServiceCommand } from "@aws-sdk/client-ecs";

export const handler = async (event: { key: boolean }) => {
  const start = event.key;

  try {
    const client = new ECSClient();

    let command = undefined;

    if (start) {
      command = new UpdateServiceCommand({
        service: process.env.SERVICE_NAME,
        cluster: process.env.CLUSTER_NAME,
        desiredCount: 0,
      });
    } else {
      command = new UpdateServiceCommand({
        service: process.env.SERVICE_NAME,
        cluster: process.env.CLUSTER_NAME,
        desiredCount: 1,
      });
    }

    await client.send(command);

    console.log(`Service ${start ? "started" : "stopped"} successfully`);
    return {
      statusCode: 200,
      body: JSON.stringify(
        `Service ${start ? "started" : "stopped"} successfully`
      ),
    };
  } catch (error) {
    console.error(`Error ${start ? "starting" : "stopping"} service`, error);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error ${start ? "starting" : "stopping"} service`),
    };
  }
};
