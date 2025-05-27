
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordOutput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const historyDiv = document.getElementById('history');

let history = [];

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

function generatePassword() {
  const length = +lengthInput.value;
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const num = '0123456789';
  const sym = '!@#$%^&*()_+{}[]|:;<>,.?/~';

  let allChars = '';
  if (uppercase) allChars += upper;
  if (lowercase) allChars += lower;
  if (numbers) allChars += num;
  if (symbols) allChars += sym;

  if (!allChars) {
    passwordOutput.textContent = 'Selecione ao menos uma opção!';
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  passwordOutput.textContent = password;
  evaluateStrength(password);
  updateHistory(password);
}

function copyPassword() {
  const password = passwordOutput.textContent;
  if (!password || password.includes("Selecione")) return;

  navigator.clipboard.writeText(password);
  alert('Senha copiada!');
}

function evaluateStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ["#ff4d4d", "#ff944d", "#ffd11a", "#b3d14a", "#4caf50"];
  strengthBar.style.background = colors[score - 1] || "#ccc";
}

function updateHistory(password) {
  history.unshift(password);
  if (history.length > 5) history.pop();

  historyDiv.innerHTML = history.map(pwd => `<div class="history-item">${pwd}</div>`).join('');
}
