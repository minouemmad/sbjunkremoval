const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer(function(req, res) {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Add routes for different pages
    if (filePath === './why-choose-us') {
        filePath = './why-choose-us.html';
    } else if (filePath === './services') {
        filePath = './services.html';
    } else if (filePath === './pricing') {
        filePath = './pricing.html';
    } else if (filePath === './about-us') {
        filePath = './about-us.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});