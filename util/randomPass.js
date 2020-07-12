const randomPass = () => {
  let pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#%^&*";
  let pwdLen = 8;
  let randPassword = Array(pwdLen).fill(pwdChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
  return randPassword;
}

module.exports = randomPass
