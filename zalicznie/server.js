// import http
const http = require("http");

//import opcji
const app = require("./app");

// ustawiam port
const port = process.env.port || 3001;

// tworzę serwer
const server = http.createServer(app);

// odpalam serwer
//nodemon server.js

server.listen(port, () => {
  console.log("serwer na porcie 3001");
});
