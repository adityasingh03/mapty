'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapevent;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';
  L.marker([mapevent.latlng.lat, mapevent.latlng.lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 200,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');

  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

class App {
  #map;
  #mapEvent;
  constructor() {
    app._getposition(); 
  }

  _getposition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Accept to continue');
      });
  }

  _loadMap(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(`https://www.google.com/maps/@${lat},${long},15z`);

    this.#map = L.map('map').setView([lat, long], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, long]).addTo(map).bindPopup('Home').openPopup();
    let i = 1;

    this.#map.on('click', function (mape) {
      this.#mapevent = mape;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showform() {}

  _toggleElevationFeild() {}
  _newWorkout() {}
}

const app = new App();
