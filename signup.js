const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');

function isPasswordStrong(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[\W_]/.test(password);
  return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSymbol;
}

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!isPasswordStrong(password)) {
    signupMessage.textContent = "Adgangskoden skal være mindst 8 tegn og indeholde store og små bogstaver, tal og symboler.";
    signupMessage.style.color = "orange";
    return;
  }

  signupMessage.textContent = "Tilmelding succesfuld! Du kan nu logge ind.";
  signupMessage.style.color = "lightgreen";

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
