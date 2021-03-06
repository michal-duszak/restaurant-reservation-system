function reservationValidateForm() {

    const guestInput = document.getElementById('guest');
    const tableInput = document.getElementById('table');
    const dateInput = document.getElementById('reservationDate');
    const timeInput = document.getElementById('reservationTime');
    const numberOfGuestsInput = document.getElementById('reservationNumberOfGuests');
    const orderNumberInput = document.getElementById('reservationOrderNumber');

    const errorTable = document.getElementById('errorReservationTable');
    const errorGuest = document.getElementById('errorReservationGuest');
    const errorDate = document.getElementById('errorReservationDate');
    const errorNumberOfGuests = document.getElementById('errorReservationNumberOfGuests');
    const errorTime = document.getElementById('errorReservationTime');
    const errorOrderNumber = document.getElementById('errorReservationOrderNumber');
    const errorsSummary = document.getElementById('errorsSummary');
    const form = document.getElementById('form');
    

    resetErrors([guestInput, tableInput, dateInput, timeInput, numberOfGuestsInput, orderNumberInput], [errorTable, errorGuest, errorDate, errorTime, errorNumberOfGuests, errorOrderNumber], errorsSummary);

    let valid = true;

    if (!checkRequired(guestInput.value)) {
        valid = false;
        guestInput.classList.add("error-input");
        errorGuest.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(tableInput.value)) {
        valid = false;
        tableInput.classList.add("error-input");
        errorTable.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDateFormat(dateInput.value)) { 
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Zły format daty! Oczekuję dd-mm-rrrr";
    }

    if (!checkRequired(timeInput.value)) {
        valid = false;
        timeInput.classList.add("error-input");
        errorTime.innerText = "Pole jest wymagane";
    } else if (!checkTimeFormat(timeInput.value)) {
        valid = false;
        timeInput.classList.add("error-input");
        errorTime.innerText = "Zły format godziny! Oczekuję gg:mm";
        
    }

    if (!checkRequired(numberOfGuestsInput.value)) {
        valid = false;
        numberOfGuestsInput.classList.add("error-input");
        errorNumberOfGuests.innerText = "To pole jest wymagane";
    } else if (!checkNumberRange(numberOfGuestsInput.value, 1, 8)) {
        valid = false;
        numberOfGuestsInput.classList.add("error-input");
        errorNumberOfGuests.innerText = "Oczekuję liczby w przedziale od 1 do 8!";
    }

    
    if (!checkRequired(orderNumberInput.value)) {
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "To pole jest wymagane";
    } else if (!checkIsNumber(orderNumberInput.value)) {
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Oczekuję liczby!";
    } else if (!checkNumberRange(orderNumberInput.value, 1, 99)) {
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Proszę podać liczbę w zakresie 1-99";
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy!";
    }

    return valid;
}