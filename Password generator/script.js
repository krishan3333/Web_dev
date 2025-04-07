const passwordBox = document.getElementById('password');
const copyBox = document.getElementById('copy');
const generateBox = document.getElementById('generate');

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

const allChars = upperCase + lowerCase + numbers + symbols;

function createPassword() {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    while (password.length < 12) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = password;
}

function copyPassword() {
    if (passwordBox.value) {
        passwordBox.select();
        document.execCommand("copy");
        copyBox.src = "images/check.png";
        setTimeout(() => {
            copyBox.src = "images/copy.png";
        }, 1000);
    }
}

generateBox.addEventListener('click', createPassword);
copyBox.addEventListener('click', copyPassword);
