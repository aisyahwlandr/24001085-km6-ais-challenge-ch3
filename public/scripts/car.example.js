class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="col-12 mb-4">
        <div class="rounded shadow p-4">
            <div class="position-relative mb-4">
                <img class="img-fluid rounded card-image" src="${this.image}" alt="">
            </div>
            <p class="text-muted custom-paragraf-bold">${this.manufacture} / ${this.type}</p>
            <p class="h6 fw-bold">Rp ${this.rentPerDay} / hari
            </p>
            <p class="text-muted custom-paragraf">${this.description}</p>
            <p class="text-muted custom-paragraf"><img src="./images/user.png" class="user-icon">${this.capacity} Orang</p>
            <p class="text-muted custom-paragraf"><img src="./images/settings.png" class="user-icon">${this.transmission}</p>
            <p class="text-muted custom-paragraf"><img src="./images/calendar.png" class="user-icon">Tahun ${this.year}</p>
            <a class="d-flex align-items-center justify-content-center" href="#"
                style="text-decoration: none;">
                <button type="button" class="btn" style="
                    color: white;
                    background-color: #5CB85F;
                    padding: 8px;
                    border-radius: 6px;
                    width: 100vh;
                ">Pilih Mobil</button>
            </a>
        </div>
    </div>
    `;
  }
}