const http = require('http');
const cars = require('./cars');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator');

const server = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'GET' && url === '/') {
        const carsArray = cars.getCars();
        
        console.log(carsArray);

        res.setHeader('Content-Type', 'text/html');

        res.write(getHTMLDocumentStart());
        res.write('<body>');

        const id = 3;
        res.write(`<p>${cars.getCarInformation(id)}</p>`);
        res.write(`<p>${cars.getCarAge(id)}</p>`);

        res.write('</body>');
        res.write(getHTMLDocumentEnd());

        return res.end();
    }

    res.statusCode = 404;
    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
}); 
