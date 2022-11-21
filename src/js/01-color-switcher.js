function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.stopButton.setAttribute('disabled', true);

const colorRender = {
  timerId: null,

  start() {
    refs.startButton.setAttribute('disabled', true);
    refs.stopButton.removeAttribute('disabled');

    this.timerId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', true);

    clearInterval(this.timerId);
  },
};

refs.startButton.addEventListener('click', () => {
  colorRender.start();
});
refs.stopButton.addEventListener('click', () => {
  colorRender.stop();
});

console.log(colorRender);
