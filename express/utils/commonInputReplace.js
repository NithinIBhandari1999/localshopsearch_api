/* eslint-disable camelcase */

const isInputValidGt0 = input => {
    if (input === undefined || input === null) {
        return 'Required Field';
    }
    input = input.toString().trim();
    if (input.trim() === '') {
        return 'Required Field';
    }
    if (isNaN(input)) {
        return 'Please enter a valid number that is GT 0.';
    }
    if (input >= 1) {
        return '';
    } else {
        return 'Please enter a valid number that is GT 0.';
    }
};

const inputReplaceText = (
    input,
    accept_0_to_9,
    accept_A_to_Z,
    accept_a_to_z,
    acceptSpecialSymbol
) => {
    const inputText = input;
    let inputTextReturn = '';

    for (let index = 0; index < inputText.length; index += 1) {
        const element = inputText.charCodeAt(index);

        if (accept_0_to_9) {
            if (element >= 48 && element <= 57) {
                inputTextReturn = `${inputTextReturn}${inputText[index]}`;
            }
        }

        if (accept_A_to_Z) {
            if (element >= 65 && element <= 90) {
                inputTextReturn = `${inputTextReturn}${inputText[index]}`;
            }
        }

        if (accept_a_to_z) {
            if (element >= 97 && element <= 122) {
                inputTextReturn = `${inputTextReturn}${inputText[index]}`;
            }
        }

        // acceptSpecialSymbol will accept ascii number
        if (Array.isArray(acceptSpecialSymbol)) {
            for (let index2 = 0; index2 < acceptSpecialSymbol.length; index2 += 1) {
                if (isInputValidGt0(element) === '') {
                    if (element === acceptSpecialSymbol[index2]) {
                        inputTextReturn = `${inputTextReturn}${inputText[index]}`;
                    }
                }
            }
        }
    }

    return inputTextReturn;
};

const filterUniqueUrl = uniqueUrl => {
    let tempValue = uniqueUrl;
    tempValue = tempValue.replaceAll(' ', '-').toLowerCase();

    tempValue = inputReplaceText(tempValue, true, false, true, [45]);

    return tempValue;
};

const customInputValidations = {
    inputReplaceText,

    filterUniqueUrl
};

module.exports = customInputValidations;
