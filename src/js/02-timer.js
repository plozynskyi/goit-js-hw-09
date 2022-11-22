import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  secondSpan: document.querySelector('[data-seconds]'),
  minuteSpan: document.querySelector('[data-minutes]'),
  hourSpan: document.querySelector('[data-hours]'),
  daySpan: document.querySelector('[data-days]'),
};

refs.startButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    const date = new Date(selectedDates[0]).getTime();

    if (date < Date.now()) {
      return (
        Notiflix.Notify.failure('Обери дату в майбутньому!'),
        refs.startButton.setAttribute('disabled', true)
      );
    } else refs.startButton.removeAttribute('disabled');
    Notiflix.Notify.success('Скоріше тисни "Start"');
  },
};

flatpickr(refs.input, options);

const countdownTimer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deadLine = new Date(refs.input.value).getTime();
      const deltaTime = deadLine - new Date();

      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
        Notiflix.Report.success(
          'Start Black Friday 2022!!!!',
          '',
          'Go to sales',
          function reloadPage() {
            window.location.reload();
          }
        );
      }

      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      updateTimeIterface({ days, hours, minutes, seconds });
      refs.startButton.setAttribute('disabled', true);
    }, 1000);
  },
};

refs.startButton.addEventListener('click', () => countdownTimer.start());

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
