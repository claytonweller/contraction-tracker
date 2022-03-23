# Contraction Tracker Backend

The backend is a series of lambda functions each in charge of a single crud operation.

## Installation
- make sure you're have node version 14 or higher installed
- run `yarn`
- To make sure things are operating as expected run `yarn test`

Bam you're done. There is no way to run funcitons locally (as a server), because this is all built to work on AWS lambda.

## Deployment
When you're ready to push changes up to AWS:
- go to the base folder for the project, and run `yarn` this will install the serverless framework.
  - We do this in the parent folder because we don't want the serverless packages to be dependencies for the deployed lambdas.
- You will have to create `/backend/.env` and put in values for your aws credentials.
  - AWS_SECRET_ACCESS_KEY
  - AWS_ACCESS_KEY_ID
- Then in the `/backend` folder again run `yarn deploy`.
  - This will create a `/dist` folder for the js build.
  - It will also create a production only set of packages in `/nodejs` which serverless will use to create a dependency lambda layer. This makes future deployments MUCH quicker.
- Wait. You may have to update your AWS IAM policy to all the specific processes required by the deployment.

When successful you will now have some new dynamo tables, lambdas, and api gateways.

## Structure / organization
Within the `/app` folder is all of the code.
- `/handlers`: this is where we manage our top level interface with lambda functions. We also have our schema validation on this layer.
- `/integrations`: every time we're connecting to an external service like a DB or an api we put it here. I've chosen to do some "Clean Architecture" inspired dependency injection here because it makes testing easier, and also allows for a less painful transition to replacement services.
- `/types`: this is where globally relevant custom Typescript interfaces live. Most of these are produced by the schemas in the handlers via the `zod` package.
- `/utils`: files with functionality which could be useful throughout the application.
- `/__test__`: these are the tests. The internal file structer is an exact copy of the the `/app` folder to easily find where the appropriate test is.

## Technology used
- Typescript
- Dynamo DB - I chose to use dynamo because it was cheap, has fast reads, and I wasn't expecting to need to do any complicated queries or in depth data analysis.
- Jest 
- Luxon - Lots of time stuff required. So Luxon DateTime is used ALL over the place.
- Zod - For validation, and custom interface generation.
- Serverless framework - All deployment is managed through serverless, check out `serverless.js` for the specifics.