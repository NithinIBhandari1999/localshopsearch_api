/* eslint-disable no-else-return */
var validator = require('validator');

const isValidPhone = phone => {
  const exp = /^[0-9]{6,16}$/;
  return exp.test(String(phone));
};

const isValidPassword = pwd => {
  const expression = /^(?=.*\d)(?=.*[!@#$%^&*;_~>])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
  return expression.test(String(pwd));
};

const isInputEmpty = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  if (input.trim() === '') {
    return 'Required Field';
  }
  return '';
};

const isInputPasswordValid = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isValidPassword(input) === false) {
    return 'Please enter a valid Password.';
  }
  return '';
};

const isInputEmailValid = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if ( validator.isEmail(input) === false) {
    return 'Please enter a valid Email.';
  }
  return '';
};

const isInputPhoneNumberValid = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isValidPhone(input) === false) {
    return 'Please enter a valid Phone Number.';
  }
  return '';
};

const isInputPhoneNumberValidOrNotRequired = input => {
  if (input === undefined || input === null) {
    return '';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return '';
  }
  if (isValidPhone(input) === false) {
    return 'Please enter a valid Phone Number.';
  }
  return '';
};

const isInputPastDate = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  if (input.trim() === '') {
    return 'Required Field';
  }

  const date = new Date(input);
  if (date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
    return 'Date Cannot be Future Date.';
  }

  return '';
};

const isInputFutureDate = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  if (input.trim() === '') {
    return 'Required Field';
  }

  const date = new Date(input);
  if (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
    return 'Date Cannot be Past Date.';
  }

  return '';
};

const isInputSelectSelected = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '' || input.trim() === '0') {
    return 'Required Field';
  }
  return '';
};

const isInputValidPincode = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (input.length !== 6) {
    return 'Please enter a valid pincode.';
  }
  if (isNaN(input)) {
    return 'Please enter a valid pincode.';
  }
  if (input >= 100001 && input <= 999999) {
    return '';
  } else {
    return 'Please enter a valid pincode.';
  }
};

const isInputValidYear = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (input.length !== 4) {
    return 'Please enter a valid year.';
  }
  if (isNaN(input)) {
    return 'Please enter a valid year.';
  }
  const year = new Date().getFullYear();
  if (input >= year - 100 && input <= year + 10) {
    return '';
  } else {
    return `Please enter a valid year between ${year - 100} and ${year + 5}.`;
  }
};

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

const isInputValidMongodbId = input => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  if (input.trim() === '') {
    return 'Required Field';
  }
  const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');
  if (checkForValidMongoDbID.test(input)) {
    return '';
  }
  return 'Please enter valid Mongodb Object Id';
};

const isInputValidMongodbIdOrNotRequired = input => {
  if (
    input === 'undefined' ||
    input === 'null' ||
    input === undefined ||
    input === null
  ) {
    return '';
  }
  if (input.trim() === '') {
    return '';
  }
  const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');
  if (checkForValidMongoDbID.test(input)) {
    return '';
  }
  return 'Please enter valid Mongodb Object Id';
};

const isInputEmptyOrNotRequired = input => {
  if (input === undefined || input === null) {
    return '';
  }
  if (input.trim() === '') {
    return '';
  }
  return '';
};

const isInputValidLte = (input, max) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isNaN(input)) {
    return 'Please enter a valid number.';
  }
  if (input <= max) {
    return '';
  } else {
    return 'Please enter a valid number.';
  }
};

const isInputValidGte = (input, min) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isNaN(input)) {
    return 'Please enter a valid number.';
  }
  if (input >= min) {
    return '';
  } else {
    return 'Please enter a valid number.';
  }
};

const isInputValidLatitude = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isNaN(input)) {
    return 'Please enter a valid Longitude.';
  }
  if (input >= -90 && input <= 90) {
    return '';
  } else {
    return 'Please enter a valid Latitude.';
  }
};

const isInputValidLongitude = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isNaN(input)) {
    return 'Please enter a valid Longitude.';
  }
  if (input >= -180 && input <= 180) {
    return '';
  } else {
    return 'Please enter a valid Longitude.';
  }
};

const customInputValidations = {
  isInputEmpty,
  isInputPastDate,
  isInputFutureDate,
  isInputEmailValid,
  isInputPasswordValid,
  isInputPhoneNumberValid,
  isInputValidPincode,
  isInputSelectSelected,
  isInputValidYear,
  isInputValidGt0,
  isInputValidMongodbId,
  isInputValidLte,
  isInputValidGte,
  isInputValidLatitude,
  isInputValidLongitude,

  isInputEmptyOrNotRequired,
  isInputPhoneNumberValidOrNotRequired,
  isInputValidMongodbIdOrNotRequired
};

module.exports = customInputValidations;
