const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = loginForm.querySelector('button');

let attempts = 0;
let cooldownInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  attempts = parseInt(localStorage.getItem('attempts')) || 0;
  const storedLockedUntil = localStorage.getItem('lockedUntil');

  if (storedLockedUntil) {
    const lockedUntil = new Date(storedLockedUntil);
    if (new Date() < lockedUntil) {
      startCooldown(lockedUntil);
    } else {
      resetLockout();
    }
  }
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const lockedUntilStr = localStorage.getItem('lockedUntil');
  if (lockedUntilStr) {
    const lockedUntil = new Date(lockedUntilStr);
    if (new Date() < lockedUntil) {
      // Cooldown aktiv - ignorer loginforsøg
      return;
    }
  }

  const correctEmail = "test@gmail.com";
  const correctPassword = "Niclas123!";

  if (email === correctEmail && password === correctPassword) {
    message.textContent = "Du er logget ind!";
    message.style.color = "lightgreen";
    resetLockout();

  } else {
    attempts++;
    localStorage.setItem('attempts', attempts);

    if (attempts >= 3) {
      const lockedUntil = new Date(Date.now() + 20 * 1000); 
      localStorage.setItem('lockedUntil', lockedUntil);
      startCooldown(lockedUntil);
    } else {
      message.textContent = `Forkert login. Antal forsøg: ${attempts}`;
      message.style.color = "orange";
    }
  }
});

function startCooldown(until) {
  disableInputs();

  if (cooldownInterval) clearInterval(cooldownInterval);

  cooldownInterval = setInterval(() => {
    const now = new Date();
    if (now >= until) {
      clearInterval(cooldownInterval);
      resetLockout();
      return;
    }

    const secondsLeft = Math.ceil((until - now) / 1000);
    message.textContent = `Du er låst ude. Prøv igen om ${secondsLeft} sekunder.`;
    message.style.color = "red";
  }, 1000);
}

function resetLockout() {
  attempts = 0;
  localStorage.removeItem('attempts');
  localStorage.removeItem('lockedUntil');
  enableInputs();
  message.textContent = "";
}

function disableInputs() {
  emailInput.disabled = true;
  passwordInput.disabled = true;
  submitButton.disabled = true;
}

function enableInputs() {
  emailInput.disabled = false;
  passwordInput.disabled = false;
  submitButton.disabled = false;
}
