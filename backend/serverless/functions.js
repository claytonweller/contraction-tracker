function makeLambdaFunction(table, operation, method, querystrings) {
  const lambdaName = `${operation}-${table}`
  return {
    [lambdaName]: {
      handler: `dist/handlers/${table}/${operation}.handler`,
      events: [
        makeLambdaEvent(method, table, operation, querystrings)
      ],
      layers: [{ Ref: 'ContractionTrackerDependenciesLambdaLayer' }],
      package: {
        include: [
          `dist/handlers/${table}/${operation}.js`,
          `dist/handlers/${table}/schema.js`,
          'dist/integrations/**',
          'dist/utils/**'
        ],
        exclued: [
          './**',
          'node_modules/**',
        ]
      }
    }
  }
}

function makeLambdaEvent(method, table, operation, querystrings) {
  const path = `${table}/${operation}`
  if (method === 'get') return makeGetLambdaEvent(path, querystrings)
  return makePostLambdaEvent(path)
}

function makeGetLambdaEvent(path, querystrings) {
  return {
    http: {
      method: 'get',
      path,
      private: true,
      cors: true,
      request: {
        parameters: {
          querystrings
        }
      }
    }
  }
}


function makePostLambdaEvent(path) {
  return {
    http: {
      method: 'post',
      path,
      private: true,
      cors: true
    }
  }
}

module.exports = {
  functions: {
    ...makeLambdaFunction('labor', 'create', 'post'),
    ...makeLambdaFunction('labor', 'update', 'post'),
    ...makeLambdaFunction('labor', 'get', 'get', { userId: true }),
    ...makeLambdaFunction('user', 'create', 'post'),
    ...makeLambdaFunction('user', 'update', 'post'),
    ...makeLambdaFunction('user', 'get', 'get', { userId: true })
  }
}