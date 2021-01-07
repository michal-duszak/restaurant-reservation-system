const guestInput = document.getElementById('guest');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsCountInput = document.getElementById('guestsCount');
const tableNameInput = document.getElementById('tableName');
const errorGuest = document.getElementById('errorGuest');
const errorDate = document.getElementById('errorDate');
const errorTime = document.getElementById('errorTime');
const errorsSummary = document.getElementById('errorsSummary');
const errorGuestsCount = document.getElementById('errorGuestsCount');
const errorTableName = document.getElementById('errorTableName');
const form = document.getElementById('form');

form.addEventListener("submit", (e) => {  
    e.preventDefault();
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


resetErrors([guestInput, dateInput, timeInput, guestsCountInput, tableNameInput], [errorGuest, errorDate, errorGuestsCount, errorTableName], errorsSummary);


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

function checkValidation(errorTexts) {
    return errorTexts.every((x) => {
        return x.innerText == "";
    })
}

function checkRequired(value) {
     if (!value) {
         return false;
    }
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

function checkDateCorrect(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{2})-(\d{2})-(\d{4})/;
    return pattern.test(value);
}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

function checkGuest() {
    if (!checkRequired(guestInput.value)) {
        valid = false;
        guestInput.classList.add("error-input");
        errorGuest.innerText = "Pole jest wymagane";
    } 
}

function checkDate() {
    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } 
    if (!checkDateCorrect(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Nieprawidłowy format daty";
    
    }
}

function checkTime() {
    if (!checkRequired(timeInput.value)) {
        valid = false;
        timeInput.classList.add("error-input");
        errorTime.innerText = "Pole jest wymagane";
    } 
}

// function checkEmailRegex(value) {
//     value = value.toString().trim();
//     const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     return re.test(value);
// }

function checkGuestsCount() {
    if (!checkRequired(guestsCountInput.value)) {
        valid = false;
        guestsCountInput.classList.add("error-input");
        errorGuestsCount.innerText = "Pole jest wymagane";
    } else if (!checkNumber(guestsCountInput.value)) {
        valid = false;
        guestsCountInput.classList.add("error-input");
        errorGuestsCount.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(guestsCountInput.value, 1, 6)) {
        valid = false;
        guestsCountInput.classList.add("error-input");
        errorGuestsCount.innerText = "Pole powinno być liczbą w zakresie od 1 do 6";
    } 
}

function checkTableName() {
    if (!checkRequired(tableNameInput.value)) {
        valid = false;
        tableNameInput.classList.add("error-input");
        errorTableName.innerText = "Pole jest wymagane";
    } 
}


function validateForm() {
    resetErrors([guestInput, dateInput, timeInput, guestsCountInput, tableNameInput], [errorGuest, errorDate, errorTime, errorGuestsCount, errorTableName], errorsSummary);
    console.log("Starting validation...");
    checkGuest();
    checkDate();
    checkTime();
    checkGuestsCount();
    checkTableName();
    // checkValidation([errorGuest, errorDate, errorTime, errorGuestsCount, errorTableName]);
    if (checkValidation([errorGuest, errorDate, errorTime, errorGuestsCount, errorTableName])) {
        valid = true;
    }
    if (!valid) {
        console.log("Not valid!")
        errorsSummary.innerText = "Formularz zawiera błędy";
    } 

    if (valid) {
        console.log("10000% valid!");
        errorsSummary.innerText = "";
    }
    console.log("Validation complete, it's OK.")
}