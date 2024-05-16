const http = require('http');
const fs = require('fs');
const path = require('path'); // Import the path module
const port = 3000;

const server = http.createServer(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const filePath = path.join(__dirname, 'index.html'); // Get the absolute path to index.html
    fs.readFile(filePath, function(error, data) {
        if (error) {
            res.writeHead(500); // Change status code to 500 for server error
            res.write('Error: Internal Server Error');
        } else {
            res.write(data);
        }
        res.end(); // Move res.end() outside of the readFile callback
    });
});

server.listen(port, function(error){
    if(error){
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port '+ port);
    }
});