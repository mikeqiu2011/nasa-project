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


