// Regex
function nameValidation() {
  return /^[a-zA-Z ]+$/.test($("#nameInput").val());
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    $("#emailInput").val()
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    $("#phoneInput").val()
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val());
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val());
}

function repasswordValidation() {
  return $("#repasswordInput").val() == $("#passwordInput").val();
}

export {
  nameValidation,
  emailValidation,
  phoneValidation,
  ageValidation,
  passwordValidation,
  repasswordValidation,
};
