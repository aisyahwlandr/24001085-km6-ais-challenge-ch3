const carRepo = require("../../repository/car");

exports.getCars = (manufacture, type, rentPerDay, description, capacity, transmission, year) => {
    const data = carRepo.getCars(manufacture, type, rentPerDay, description, capacity, transmission, year);
    return data;
};

exports.getCar = (id) => {
    const data = carRepo.getCar(id);
    return data;
}

exports.addCar = (payload) => {
    const data = carRepo.addCar(payload);
    return data;
};

exports.updateCar = (updater) => {
    const data = carRepo.updateCar(updater);
    return data;
};

exports.deleteCar = (deleted) => {
    const data = carRepo.deleteCar(deleted);
    return data;
};