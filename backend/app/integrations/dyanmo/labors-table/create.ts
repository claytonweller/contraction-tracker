import * as AWS from 'aws-sdk'

const dynamo = new AWS.DynamoDB.DocumentClient()
export async function createLabor(newLabor) {
  const getParams = {
    TableName: 'laborsTable',
    Key: {
      userId: "123"
    }
  }
  const existingLabors = await dynamo.get(getParams).promise()

  const labor = {
    userId: "123",
    labors: [...existingLabors?.Item?.labors, newLabor]
  }
  const laborInfo = {
    TableName: 'laborsTable',
    Item: labor,
  };
  const result = await dynamo.put(laborInfo).promise()
  console.warn(result)
  return result
}