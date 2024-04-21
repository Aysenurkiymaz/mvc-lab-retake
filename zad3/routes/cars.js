const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

let cars = [];
let nextId = 1;

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'car.html');

    fs.readFile(filePath, 'utf-8', (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const $ = cheerio.load(html);

        if (cars.length === 0) {
            $('.car').html('No cars have been found.');
        } else {
            $('.car').html('<h2>Last added car</h2>');
            car = cars[cars.length - 1];
            
            $('.car').append(`<div><span class="bold">Make:</span> ${car.make}</div>`);
            $('.car').append(`<div><span class="bold">Model:</span> ${car.model}</div>`);
            $('.car').append(`<div><span class="bold">Year:</span> ${car.year}</div>`);
            $('.car').append(`<div><span class="bold">Color:</span> ${car.color}</div>`);
            
        }

        res.send($.html());
    });
});

router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-car.html'));
});

router.post('/add', (req, res) => {
    const { make, model, year, color } = req.body;
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    res.redirect('/car');
});

router.get('/list', (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'cars-list.html');

    fs.readFile(filePath, 'utf-8', (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const $ = cheerio.load(html);

        if (cars.length === 0) {
            $('.cars').html('No cars have been found.');
        } else {
            $('.cars').html('<h2>Cars</h2><ul class="carlist"></ul>');
            cars.forEach(car => {
                $('.carlist').append(`<li><p><span class="bold">Make:</span> ${car.make}</p><p><span class="bold">Model:</span> ${car.model}</p><p><span class="bold">Year:</span> ${car.year}</p><p><span class="bold">Color:</span> ${car.color}</p></li>`);
            });
        }

        res.send($.html());
    });
});

module.exports = router;

