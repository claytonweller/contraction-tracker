# Contraction Tracker Frontend

This is a very bare-bones react application. I created it using `create-react-app` it connects to the backend. In general the front end does as little calculation/logic as possible. It's just in charge of sending input information to the backend which interprets/presists.

## Installation
- First make sure to deploy the backend to AWS (There are specific instrucitons for that in the `/backend/README.md`)
- run `yarn`
- create a `/web/.env` file and poplulate it with.
  - REACT_APP_BACKEND_URL (This should be the url of your new API gateway)
  - REACT_APP_BACKEND_API_KEY (Also associated with the new API gateway)
- run `yarn start` and you're off the to races for local development.

## Deployment
Deployments for this application are through a statically hosted S3 bucket.
- in your `.env` add these values for your AWS IAM user.
  - AWS_SECRET_ACCESS_KEY
  - AWS_ACCESS_KEY_ID
- In AWS create a S3 bucket for hosting. 
  - Make sure it allows ACL access
  - In the properties all the way at the bottom enable static website hosting and point it at `index.html`
- in `/web/package.json` update the "deploy" command to use your bucket (unless you used the exact name I used... which has my name in it)
- Run `yarn deploy`
- Wait. You may have to update your IAM user's permissions, or your bucket permission settings.

## Structure / Organization
Inisde `/web/src` - 
- `/compoenents`: This is where all of the react specific elements are stored.
- `/integrations`: Every time we're connecting to an external service like the backend or an api we put it here. I've chosen to do some "Clean Architecture" inspired dependency injection here because it makes testing easier, and also allows for a less painful transition to replacement services.
- `/utils`: files with functionality which could be useful throughout the application.

## Techonolgy used
- Typescript / React
- D3 - for making the graphs!
- Luxon - Lots of time stuff required. So Luxon DateTime is used ALL over the place.
