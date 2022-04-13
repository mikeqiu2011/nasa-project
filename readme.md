# NASA project for fullstack developer

## prepare front end
    cd client && npm i && npm run start
    http://localhost:3000

## prepare server
    cd server && npm init -y && npm i express && \
    npm i nodemon --save-dev

## automation full stack application
    "scripts": {
        "server": "cd server && npm run watch",
        "client": "npm start --prefix client",
        "watch": "npm run server & npm run client",
        "test": "echo \"Error: no test specified\" && exit 1"
    }

## production build and deploy of client
    cd client && npm run build
    http://localhost:8000/

## auto testing using Jest
    npm i jest --save-dev
    jest or npm test

## http integration test using supertest
    npm i supertest --save-dev

## using pm2 for production build
    npm run deploy-cluster
    now request may save to different server memory causing confusion

## mongoDB atlas and mongoose
    https://cloud.mongodb.com/v2/6254e961c6f9c33040c8bd42#clusters
    npm i mongoose

## spaceX API
    https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md
    https://app.getpostman.com/run-collection/ed4ed700dcc55b2c1f1c

### populate data
    https://api.spacexdata.com/v4/launches/query
    {
        "query": {},
        "options": {
            "populate": [
                "rocket"
            ]
        }
    }

    or we can only populate the name:
    "populate": [
            {
                "path": "rocket",
                "select": {
                    "name": 1
                }
            }
        ]



