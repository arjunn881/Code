const http = require("http");

const hostname = "127.0.0.1";

const port = 5000;
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader("Content-type", "text/plain");
        res.end("Hello Guys");
    } else if(req.url === '/extra'){
        res.statusCode = 200;
        res.setHeader("Content-type", "text/plain");
        res.end("Hello Guys , Are you asking for extra???");
    }

});

server.listen(port, hostname, () => {
  console.log(`Sevr is listenning : http://${hostname}:${port}`);
});
