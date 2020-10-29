/* HTTP function get data from event and resize the GKE cluster pools based on data */

const container = require("@google-cloud/container");
const client = new container.v1.ClusterManagerClient();

exports.helloHTTP = async (req, res) => {
  console.log(`Request Body`, req.body);

  const request = {
    projectId:  req.body.projectId,
    zone:       req.body.zone,
    clusterId:  req.body.cluster_id,
    nodePoolId: req.body.node_pool_id,
    nodeCount:  req.body.node_count,
  };

  const result = await client.setNodePoolSize(request);
  const operation = result[0];

  console.log(operation);
  res.status(200);
};