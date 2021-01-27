function guestValidateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const telNumberInput = document.getElementById('tel');
    const emailInput = document.getElementById('email');
    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorsSummary = document.getElementById('errorsSummary');
    const errorTelNumber = document.getElementById('errorTelNumber');
    const form = document.getElementById('form');

    resetErrors([firstNameInput, lastNameInput, emailInput, telNumberInput], [errorFirstName, errorLastName, errorEmail, errorTelNumber], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "To pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "To pole musi zawierać 2-60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "To pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "To pole musi zawierać 2-60 znaków";
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "To pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "To pole musi zawierać 5-60 znaków";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Nieprawidłowy adres email";
    }

    if (!checkRequired(tel.value)) {
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "To pole jest wymagane";
    } else if (!checkIsNumber(tel.value)) {
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole musi zawierać prawidłowy numer telefonu!";
    } else if (!checkTextLengthRange(telNumberInput.value, 9, 60)) {
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "Pole musi zawierać prawidłowy numer telefonu!";
    } 
    if (!valid) {
        errorsSummary.innerText = "W formularzu są błędy";
    }

    return valid;
}