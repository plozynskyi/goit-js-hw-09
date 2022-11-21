import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  secondSpan: document.querySelector('[data-seconds]'),
  minuteSpan: document.querySelector('[data-minutes]'),
  hourSpan: document.querySelector('[data-hours]'),
  daySpan: document.querySelector('[data-days]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableSeconds: true,
  onClose(selectedDates) {
    const date = new Date(selectedDates[0]).getTime();
    console.log(date);
    if (date < Date.now()) {
      return (
        Notiflix.Notify.failure('Обери дату в майбутньому!'),
        refs.startButton.setAttribute('disabled', true)
      );
    } else refs.startButton.removeAttribute('disabled');
    Notiflix.Notify.success('Скоріше тисни "Start"');
  },
};

refs.startButton.setAttribute('disabled', true);
flatpickr(refs.input, options);

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    intervalId = setInterval(() => {
      const deadLine = new Date(refs.input.value).getTime();
      const diff = deadLine - new Date();
      if (diff <= 1000) {
        clearInterval(intervalId);
        Notiflix.Report.success(
          'Start Black Friday 2022!!!!',
          '',
          'Go to sales',
          function reloadPage() {
            window.location.reload();
          }
        );
      }
      console.log(diff);
      const { days, hours, minutes, seconds } = convertMs(diff);

      updateTimeIterface({ days, hours, minutes, seconds });
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
