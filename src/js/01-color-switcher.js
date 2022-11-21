function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

const colorRender = {
  timerId: null,

  start() {
    refs.startButton.setAttribute('disabled', 'disabled');
    refs.stopButton.removeAttribute('disabled');

    this.timerId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', 'disabled');

    clearInterval(this.timerId);
  },
};

refs.startButton.addEventListener('click', () => {
  colorRender.start();
});
refs.stopButton.addEventListener('click', () => {
  colorRender.stop();
});

// function onButtonStart() {
//   refs.startButton.setAttribute('disabled', 'disabled');
//   refs.stopButton.removeAttribute('disabled');

//   timerId = setInterval(() => {
//     refs.body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function onButtonStop() {
//   refs.startButton.removeAttribute('disabled');
//   refs.stopButton.setAttribute('disabled', 'disabled');

//   clearInterval(timerId);
// }
