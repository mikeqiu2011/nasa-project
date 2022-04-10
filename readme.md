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
