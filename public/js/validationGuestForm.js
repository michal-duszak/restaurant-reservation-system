const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const telNumberInput = document.getElementById('telNumber');
const emailInput = document.getElementById('email');
const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorEmail = document.getElementById('errorEmail');
const errorsSummary = document.getElementById('errorsSummary');
const errorTelNumber = document.getElementById('errorTelNumber');
const form = document.getElementById('form');

form.addEventListener("submit", (e) => {
    valid ? console.log("Valid") : validateForm(); 
})
function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}


resetErrors([firstNameInput, lastNameInput, emailInput, telNumberInput], [errorFirstName, errorLastName, errorEmail, errorTelNumber], errorsSummary);


let valid = true;

function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    // if (!value) {
    //     return false;
    // }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkFirstName() {
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
}

function checkTelNumber() {
    if (!checkRequired(telNumberInput.value)) {
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
}

function checkLastName() {
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }
}

function checkEmailRegex(value) {
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkEmail() {
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmailRegex(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }
}


function validateForm() {
    resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary)
    console.log("Starting validation...");
    checkFirstName();
    checkTelNumber();
    checkLastName();
    checkEmail();
    if (!valid) {
        console.log("Not valid!")
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    console.log("Validation complete, it's OK.")

}
