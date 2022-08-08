const http = require(`http`);

const server = http.createServer((req,res) => {
    console.log("server");
    res.end();
});

const PORT = 8888;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;