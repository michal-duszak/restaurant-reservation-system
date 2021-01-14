function tableValidateForm() {

    const maxGuestsInput = document.getElementById('maxGuests');
    const outsideInput = document.getElementById('outside');

    const errorsSummary = document.getElementById('errorsSummary');
    const errorMaxGuests = document.getElementById('errorMaxGuests');
    const errorOutside = document.getElementById('errorOutside');
    const form = document.getElementById('form');

    resetErrors([maxGuestsInput, outsideInput], [errorMaxGuests, errorOutside], errorsSummary);

    let valid = true;

    if (!checkRequired(maxGuestsInput.value)) {
        valid = false;
        maxGuestsInput.classList.add("error-input");
        errorMaxGuests.innerText = "To pole jest wymagane";
    } 

    if (!checkRequired(outsideInput.value)) {
        valid = false;
        outsideInput.classList.add("error-input");
        errorOutside.innerText = "To pole jest wymagane";
    }    if (!valid) {
        errorsSummary.innerText = "There are errors on the form";
    }

    return valid;
}