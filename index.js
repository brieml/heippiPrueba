const http = require('http');
  
const app = require('./src')
const server = http.createServer(app);
const PORT = 3000;


  
server.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

