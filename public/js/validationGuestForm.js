function guestValidateForm() {
    console.log("ZAUWASZ MNIE")
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
        errorFirstName.innerText = "This field is required";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "This field must contain 2-60 characters";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "This field is required";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "This field must contain 2-60 characters";
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "This field is required";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "This field must contain 5-60 characters";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Invalid e-mail address";
    }

    if (!checkRequired(tel.value)) {
        valid = false;
        telNumberInput.classList.add("error-input");
        errorTelNumber.innerText = "This field is required";
    } else if (!checkIsNumber(tel.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorTelNumber.innerText = "This field must contain a proper number!";
    }
    if (!valid) {
        errorsSummary.innerText = "There are errors on the form";
    }

    return valid;
}