function tableValidateForm() {
    console.log("ZAUWASZ MNIE")
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
        errorMaxGuests.innerText = "This field is required";
    } 

    if (!checkRequired(outsideInput.value)) {
        valid = false;
        outsideInput.classList.add("error-input");
        errorOutside.innerText = "This field is required";
    }    if (!valid) {
        errorsSummary.innerText = "There are errors on the form";
    }

    return valid;
}