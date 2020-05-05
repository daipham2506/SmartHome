// function that returns true if value is email, false otherwise
export function verifyEmail(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRex.test(value);
}

// function that returns true if value at least 6 characters, including lowercase, UPPERCASE and number, false otherwise
export function verifyPassword(value) {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
  return regex.test(value);
}

// function that verifies if a string has a given length or not
export function verifyLength(value, length) {
  return (value.length >= length) 
}