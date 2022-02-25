import { labor } from "./labors-table";
import * as AWS from 'aws-sdk'

const client = new AWS.DynamoDB.DocumentClient()

export const dynamo = {
  labor: labor(client)
}

export interface IBaseDynamoParams {
  TableName: string
}