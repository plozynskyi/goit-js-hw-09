import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  secondSpan: document.querySelector('[data-seconds]'),
  minuteSpan: document.querySelector('[data-minutes]'),
  hourSpan: document.querySelector('[data-hours]'),
  daySpan: document.querySelector('[data-days]'),
};

flatpickr(refs.input, options);

// let qqqq = refs.input.value;
// console.log(qqqq.getTime());

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    const date = new Date(refs.input.value).getTime();
    console.log(date);
    setInterval(() => {
      const currentTime = Date.now();
      const date = new Date(refs.input.value).getTime();
      const deltaTime = currentTime - date;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimeIterface({ days, hours, minutes, seconds });
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      console.log(currentTime);
      console.log();
    }, 1000);
  },
};

refs.startButton.addEventListener('click', () => timer.start());

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function updateTimeIterface({ days, hours, minutes, seconds }) {
  refs.secondSpan.textContent = `${seconds}`;
  refs.minuteSpan.textContent = `${minutes}`;
  refs.hourSpan.textContent = `${hours}`;
  refs.daySpan.textContent = `${days}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
// refs.secondSpan.textContent;
// console.dir(refs.secondSpan.textContent);
