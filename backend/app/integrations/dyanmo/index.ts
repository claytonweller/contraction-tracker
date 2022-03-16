import * as AWS from 'aws-sdk'
import { connectToLaborTable } from "./labors-table";
import { connectToUserTable } from "./users-table";

const client = new AWS.DynamoDB.DocumentClient()

export const dynamo = {
  labor: connectToLaborTable(client),
  user: connectToUserTable(client)
}

export interface IBaseDynamoParams {
  TableName: string
}