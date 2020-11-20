
export const checkForIdValidation = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
        return true;
    }
    else {
        return false;
    }
}

export const checkForNameValidation = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
        return false
    }
    else {
        return true
    }
}

export const checkForAgeValidation = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
        return true;
    }
    else {
        return false;
    }
}

export const checkForColourNameValidation = (e) => {
    let value = e.target.value;
    if (isNaN(value)) {
        return false;
    }
    else {
        return true;
    }
}