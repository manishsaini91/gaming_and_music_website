const form = document.getElementById("form");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const small = document.querySelector("small");

//Event Handler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkInput();
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // location.replace(".../index.html");
    var uid = user.uid;
  } else {


    // User is signed out
    // ...
  }
});

//Functions

function checkInput() {
  const emailValue = email.value.trim();
  const password1Value = password1.value.trim();

  if (emailValue === "") {
    showError(email, "Email ID can not be blank");
  } else if (!isEmailValid(emailValue)) {
    showError(email, "Email ID is not Valid");
  } else {
    showSuccess(email);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        location.replace(".../index.html");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  if (password1Value === "") {
    showError(password1, "Password can not be blank");
  } else {
    showSuccess(password1);
  }
}

function showError(input, msg) {
  const formcontrol = input.parentNode;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerHTML = msg;
}

function showSuccess(input) {
  const formcontrol = input.parentNode;
  formcontrol.className = "form-control success";
}

function isEmailValid(emailValid) {
  return /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,3})$/.test(
    emailValid
  );
}
