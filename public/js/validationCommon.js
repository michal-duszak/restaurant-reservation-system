
function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        console.log(errorTexts[i])
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}


function checkDateFormat(value) {
    let dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/
    console.log("DATA " + dateReg.test(value) + " WYSZŁO " + value);
    return dateReg.test(value);
}

function checkTimeFormat(value) {

    let timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    console.log("TIME " + timeReg.test(value) + " WYSZŁO " + value);
    return timeReg.test(value);

}

function checkIsNumber(value) {
    value = value.toString();
    value.replace("-", "");
    value.replace(" ", "");
    console.log(value)
    let reg = new RegExp('^[0-9]+$');
    return reg.test(value);
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
    if (!value) {
        return false;
    }
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

function checkNumberRange(value, min, max) {

    if (value > max) {
        return false;
    }
    if (value < min) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkDate(dateFrom, dateTo) {

    if (dateFrom >= dateTo) {
        if (dateTo == '') {
            return true;
        }
        return false;
    }

    return true;
}