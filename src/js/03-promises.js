import { Notify } from 'notiflix';

const refs = {
  formPromis: document.querySelector('.form'),
  delayPromis: document.querySelector('[name="delay"]'),
  stepPromis: document.querySelector('[name="step"]'),
  amountPromis: document.querySelector('[name="amount"]'),
};

refs.formPromis.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(e) {
  e.preventDefault();
  createPromises(
    Number(refs.delayPromis.value),
    Number(refs.stepPromis.value),
    Number(refs.amountPromis.value)
  );
}

function createPromises(delay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    delay += i === 1 ? 0 : step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
