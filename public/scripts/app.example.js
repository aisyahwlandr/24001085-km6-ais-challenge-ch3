class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.searchButton = document.getElementById("searchButton");

    // Menambahkan referensi ke semua elemen input yang ingin dihapus
    this.driverInput = document.getElementById('driver');
    this.rentalDateInput = document.getElementById('rentalDate');
    this.timeInput = document.getElementById('timeInput');
    this.passengerInput = document.getElementById('passengerInput');
  }

  async init() {
    // Tidak memuat pada awal inisialisasi
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);

    // Menjalankan clear setelah memuat
    this.clear();
  }

  clear = () => {
    // Menghapus semua elemen child pada container mobil
    this.carContainerElement.innerHTML = "";

    // Membersihkan value dari setiap input
    this.driverInput.value = '';
    this.rentalDateInput.value = '';
    this.timeInput.value = '';
    this.passengerInput.value = '';
    this.searchButton.disabled = true;
  };
}

// Inisialisasi App setelah DOM dimuat
document.addEventListener("DOMContentLoaded", function() {
  const app = new App();
  app.init();
});
