const fs = require('fs');
const querystring = require('querystring');
const path = require('path');
const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderCarPage } = require('../views/car');
const { renderPage: renderAddCarPage } = require('../views/add-car');

const formDataFilePath = path.join(__dirname, '..', 'formData.json');

const handleHome = (res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderHomePage());
    res.end();
};

const handleAddCar = (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(renderAddCarPage());
        res.end();
    } else if (req.method === 'POST') {
        let formData = '';
        req.on('data', chunk => {
            formData += chunk.toString();
        });
        req.on('end', () => {
            const parsedFormData = querystring.parse(formData);
            fs.writeFile(formDataFilePath, JSON.stringify(parsedFormData), (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(302, { 'Location': '/car' });
                    res.end();
                }
            });
        });
    }
};

const handleCar = (res) => {
    fs.readFile(formDataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(renderCarPage(data));
            res.end();
        }
    });
};

const handlePageNotFound = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('404 Page Not Found');
    res.end();
};

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};
