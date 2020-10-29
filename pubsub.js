/* PubSub function get data from PubSub and resize the GKE cluster pools based on data */

const Buffer = require("safe-buffer").Buffer;
const container = require("@google-cloud/container");
const client = new container.v1.ClusterManagerClient();

exports.helloPubSub = async (message, context) => {
  const payload = JSON.parse(Buffer.from(message.data, "base64").toString());

  const request = {
    projectId:  payload.projectId,
    zone:       payload.zone,
    clusterId:  payload.cluster_id,
    nodePoolId: payload.node_pool_id,
    nodeCount:  payload.node_count,
  };

  const result = await client.setNodePoolSize(request);
  const operation = result[0];

  console.log(operation);
};