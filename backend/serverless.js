'use strict'
const { resources } = require('./serverless/resources')
const { functions } = require('./serverless/functions')

module.exports = {
  org: 'claytonweller',
  service: 'contraction-tracker',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      apiKeys: ['contractionTracker']
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
        ],
        Resource: "*"
      }
    ]

  },
  layers: {
    contractionTrackerDependencies: {
      path: './',
      compatibleRuntimes: ['nodejs14.x'],
      package: {
        include: ['nodejs/node_modules/**'],
        exclude: ['./**'],
      }
    }
  },
  package: {
    individually: true
  },
  resources,
  functions
}