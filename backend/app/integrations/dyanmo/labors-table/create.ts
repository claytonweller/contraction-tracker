import * as AWS from 'aws-sdk'

const dynamo = new AWS.DynamoDB.DocumentClient()
export async function createLabor(newLabor) {
  const getParams = {
    TableName: 'laborsTable',
    Key: {
      userId: "123"
    }
  }
  const response = await dynamo.get(getParams).promise()
  const existingLabors = response?.Item?.labors || []
  const labor = {
    userId: "123",
    labors: [...existingLabors, newLabor]
  };
  const laborInfo = {
    TableName: 'laborsTable',
    Item: labor,
  };
  const result = await dynamo.put(laborInfo).promise()
  console.warn(result)
  return labor
}