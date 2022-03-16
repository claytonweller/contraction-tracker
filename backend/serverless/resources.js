const table = (tableName, primaryKey) => {
  return {
    [tableName]: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: tableName,
        AttributeDefinitions: [
          {
            AttributeName: primaryKey,
            AttributeType: 'S'
          }
        ],
        KeySchema: [
          {
            AttributeName: primaryKey,
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    }
  }
}

module.exports = {
  resources: {
    Resources: {
      ...table('laborsTable', 'userId'),
      ...table('usersTable', 'userId')
    }
  }
}