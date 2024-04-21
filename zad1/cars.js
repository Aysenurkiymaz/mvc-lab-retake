const cars = [
    { id: 1, make: "Toyota", model: "Yaris", year: 2001, colour: "white" },
    { id: 2, make: "Honda", model: "Civic", year: 2015, colour: "red" },
    { id: 3, make: "Ford", model: "Mustang", year: 2018, colour: "black" },
    { id: 4, make: "BMW", model: "3 Series", year: 2020, colour: "blue" },
    { id: 5, make: "Mercedes", model: "C Class", year: 2019, colour: "silver" },
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    const car = cars.find(c => c.id === id);
    if (car) {
        return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.colour}.`;
    } else {
        return "Car doesn't exist";
    }
}

function getCarAge(id) {
    const car = cars.find(c => c.id === id);
    if (car) {
        const currentYear = new Date().getFullYear();
        const carAge = currentYear - car.year;
        return `Car is ${carAge} years old.`;
    } else {
        return "Car doesn't exist";
    }
}

module.exports = { getCars, getCarInformation, getCarAge };