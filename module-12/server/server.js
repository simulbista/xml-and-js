const http = require(`http`);
const products = require(`../server/controller/products`);

const server = http.createServer(async(req,res) => {
    
    if(req.url === `/api/products` && req.method === `GET`){
        const {code,data} = await products.getAll();
        res.writeHead(code,{"Content-type" : "application"});
        res.end(data);
    }else if(req.method === `GET` && req.url.match(/\/api\/products\/\w+/)){
        const id = req.url.split("/")[3];
        const {code,data} = await products.getById(id);
        res.writeHead(code,{"Content-type" : "application"});
        res.end(data);
    }else{
        res.writeHead(404,{"Content-type" : "application"});
        res.end(JSON.stringify({message : "Route not found!"}));
    }
});

const PORT = 8888;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;