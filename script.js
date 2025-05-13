const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

let attempts = 0;
let lockedUntil = null;

function isPasswordStrong(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSymbol;
}

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const now = new Date();

  if (lockedUntil && now < lockedUntil) {
    const waitSeconds = Math.ceil((lockedUntil - now) / 1000);
    message.textContent = `Du er låst ude. Prøv igen om ${waitSeconds} sekunder.`;
    return;
  }

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!isPasswordStrong(password)) {
    message.textContent = "Adgangskoden skal være mindst 8 tegn og indeholde store og små bogstaver, tal og symboler.";
    return;
  }

  // Dummy mail and code
  const correctEmail = "test@gmail.com";
  const correctPassword = "Niclas123!";

  if (email === correctEmail && password === correctPassword) {
    message.textContent = "Login succesfuld!";
    attempts = 0;
    
  } else {
    attempts++;
    if (attempts >= 3) {
      lockedUntil = new Date(now.getTime() + 30 * 1000); // 30 sekunders cooldown
      message.textContent = "For mange forkerte forsøg. Vent 30 sekunder.";
    } else {
      message.textContent = `Forkert login. Antal forsøg: ${attempts}`;
    }
  }
});
