function reservationValidateForm() {

    console.log("ZAUWASZ MNIE")
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
        errorGuest.innerText = "This field is required";
    }

    if (!checkRequired(tableInput.value)) {
        valid = false;
        tableInput.classList.add("error-input");
        errorTable.innerText = "This field is required";
    }

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "This field is required";
    } else if (!checkDateFormat(dateInput.value)) { 
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Zły format daty! Oczekuję dd-mm-rrrr";
    }

    if (!checkRequired(timeInput.value)) {
        valid = false;
        timeInput.classList.add("error-input");
        errorTime.innerText = "This field is required";
    } else if (!checkTimeFormat(timeInput.value)) {
        valid = false;
        timeInput.classList.add("error-input");
        errorTime.innerText = "Zły format godziny   ! Oczekuję gg:mm";
        
    }

    if (!checkRequired(numberOfGuestsInput.value)) {
        valid = false;
        numberOfGuestsInput.classList.add("error-input");
        errorNumberOfGuests.innerText = "This field is required";
    } 

    
    if (!checkRequired(orderNumberInput.value)) {
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "This field is required";
    } else if (!checkIsNumber(orderNumberInput.value)) {
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Oczekuję cyfry!";
    }
    if (!valid) {
        errorsSummary.innerText = "There are errors on the form";
    }

    return valid;
}