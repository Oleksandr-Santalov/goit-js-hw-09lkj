const MAIN_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onFormHandle);
form.addEventListener('submit', onSubmitHendle);

function onSubmitHendle(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (form.elements.email.value !== '' && form.elements.message.value !== '') {
    const objValues = {
      email,
      message,
    };

    console.log(objValues);
    localStorage.removeItem(MAIN_KEY);
    form.reset();
  }
}

function onFormHandle() {
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const objValues = {
    email: email.trim(),
    message: message.trim(),
  };

  saveToLocal(MAIN_KEY, objValues);
}

function saveToLocal(key, value) {
  const arch = JSON.stringify(value);
  localStorage.setItem(key, arch);
}

function loadFromLocal(key) {
  const arch = localStorage.getItem(key);

  try {
    return JSON.parse(arch);
  } catch (error) {
    return arch;
  }
}

function init() {
  const data = loadFromLocal(MAIN_KEY) || {};
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}

init();
