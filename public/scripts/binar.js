function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
    static populateCars = (cars) => {
        return cars.map((car) => {
            const isPositive = getRandomInt(0, 1) === 1;
            const timeAt = new Date();
            const mutator = getRandomInt(1000000, 100000000);
            const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

            return {
                ...car,
                availableAt,
            };
        })
    }

    static async listCars(filterer, numOfPassengers = 0) {
        let cars;
        let cachedCarsString = localStorage.getItem("CARS");

        if (!!cachedCarsString) {
            const cacheCars = JSON.parse(cachedCarsString);
            cars = this.populateCars(cacheCars);
        } else {
            const response = await fetch(
                "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
            );
            const body = await response.json();
            cars = this.populateCars(body)

            localStorage.setItem("CARS", JSON.stringify(cars));
        }

        if (filterer instanceof Function) {
            cars = cars.filter(filterer);
        }

        // Filter based on number of passengers
        if (numOfPassengers > 0) {
            cars = cars.filter((car) => car.capacity >= numOfPassengers);
        }

        return cars;
    }
}

// Function to load cars data
async function loadCars() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json");
        const carsData = await response.json();
        return carsData;
    } catch (error) {
        console.error('Error loading cars data:', error);
        return [];
    }
}

const carsContainer = document.getElementById('cars-container');
const driverInput = document.getElementById('driver');
const rentalDateInput = document.getElementById('rentalDate');
const timeInput = document.getElementById('timeInput');
const passengerInput = document.getElementById('passengerInput');
const searchButton = document.getElementById('searchButton');

// Disable button cari-mobil
document.addEventListener('DOMContentLoaded', function () {
    
    // Add event listener to each input field
    [driverInput, rentalDateInput, timeInput, passengerInput].forEach(input => {
        input.addEventListener('input', function () {
            if (driverInput.value && rentalDateInput.value && timeInput.value && passengerInput.value) {
                // Enable the search button if all input fields have value
                searchButton.removeAttribute('disabled');
            } else {
                // Disable the search button if any of the input fields is empty
                searchButton.setAttribute('disabled', true);
            }
        });
    });
    
    // Initial check to disable the search button if any input is empty
    if (!driverInput.value || !rentalDateInput.value || !timeInput.value || !passengerInput.value) {
        searchButton.setAttribute('disabled', true);
    }
});


// Function to filter cars based on passenger capacity
async function filterCars() {
    try {
        const passengerInput = document.getElementById('passengerInput');
        const passengerCount = parseInt(passengerInput.value);

        const carsData = await Binar.listCars(null, passengerCount);
        displayCars(carsData);
    } catch (error) {
        console.error('Error filtering cars:', error);
    }
}

// Function to display filtered cars
function displayCars(cars) {
    carsContainer.innerHTML = '';

    if (cars.length === 0) {
        carsContainer.innerHTML = '<div class="no-cars-message text-danger">No available car</div>';
        return;
    }

    cars.forEach(car => {
        let carObject = new Car(car);
        carsContainer.innerHTML += carObject.render();
    });
}


// Initial filtering on page load
// filterCars();

async function searchBar(searchInput){
    const dataCar = await fetch(`http://localhost:3000/cars?manufacture=${searchInput}`);
    const res = await dataCar.json();
    return res;
};

async function getCar(){
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const manufacture = urlParams.get( "manufacture" );
    console.log(manufacture);
    const dataCar = await searchBar(manufacture);
    console.log(dataCar);
    displayCars(dataCar.data);
}

getCar();