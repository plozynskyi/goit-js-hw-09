function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startButton.addEventListener('click', onButtonStart);
refs.stopButton.addEventListener('click', onButtonStop);

function onButtonStart() {
  refs.startButton.setAttribute('disabled', 'disabled');
  refs.stopButton.removeAttribute('disabled');

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStop() {
  refs.startButton.removeAttribute('disabled');
  refs.stopButton.setAttribute('disabled', 'disabled');

  clearInterval(timerId);
}
