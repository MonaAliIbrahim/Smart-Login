var mainCard = document.querySelector('.main-card'),
    logoutBtn = document.getElementById('logoutBtn'),
    nameRegex = /^[a-zA-Z]{2,20}$/,
    emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex = /^.{6,14}$/,
    storedUserList = JSON.parse(localStorage.getItem('userList')),
    currentUser = JSON.parse(localStorage.getItem('currentUser')),
    userList = [];

if(storedUserList) {
  userList = storedUserList;
}

if(currentUser) {
  appendHomePage();
  logoutBtn.classList.replace('d-none','d-block');
}else {
  appendLoginFormToCard();
}

function appendHomePage() {
  mainCard.innerHTML = 
    `<h1 class="text-center my-2 fw-normal">
      Welcome <span class="fw-semibold">${currentUser.name}</span>
    </h1>`;
}

function appendLoginFormToCard() {
  mainCard.innerHTML = 
    `<form>
      <h1>Smart Login System</h1>
      <input type="email" id="emailInput" class="form-control" placeholder="Enter your email">
      <input type="password" id="passwordInput" class="form-control" placeholder="Enter your password">
      <div id="loginAlert" class="text-danger text-center fw-semibold mb-2"></div>
      <div class="d-grid">
        <button onclick="login()" type="button" class="btn btn-outline-info submit-btn mt-2">Login</button>
      </div>
      <h6 class="my-3 text-white">
        Don't have an account ?
        <button onclick="appendSignupFormToCard()" type="button" class="btn navigate-btn">
          Sign Up
        </button>
      </h6>
    </form>`;
}

function checkLoginValidation() {
  var emailInput = document.getElementById('emailInput'),
      passwordInput = document.getElementById('passwordInput'), 
      loginAlert = document.getElementById('loginAlert'),
      message = '',
      flag = false;
  if(!emailInput.value || !passwordInput.value) {
    message = "All fields are required";
  }
  else if(userList.length === 0) {
    message = "You don't have any account yet, please Sign Up first";
  } 
  else if(!emailRegex.test(emailInput.value) || !passwordRegex.test(passwordInput.value)) {
    message = 'Please insert correct data';
  }
  else {
    for(let i = 0; i < userList.length; i++) {
      if(userList[i].email === emailInput.value && userList[i].password === passwordInput.value) {
        currentUser = userList[i];
        flag = true;
        message = 'Success Login Action';
        break;
      }else {
        if(i === userList.length - 1) {
          message = 'incorrect email or password';
        }
      }
    }
  }
  if(flag) {
    loginAlert.classList.add('text-success');
    loginAlert.classList.remove('text-danger');
  }else {
    loginAlert.classList.add('text-danger');
    loginAlert.classList.remove('text-success');
  }
  loginAlert.innerHTML = message;
  return flag;
}

function login() {
  if(checkLoginValidation()) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    setTimeout(function() {
      appendHomePage();
      logoutBtn.classList.replace('d-none','d-block');
    }, 2000)
  }
}

function appendSignupFormToCard() {
  mainCard.innerHTML = 
    `<form>
      <h1>Smart Login System</h1>
      <input type="text" id="nameInput" class="form-control" placeholder="Enter your name">
      <input type="email" id="emailInput" class="form-control" placeholder="Enter your email">
      <input type="password" id="passwordInput" class="form-control" placeholder="Enter your password">
      <div id="signupAlert" class="text-danger text-center fw-semibold mb-2"></div>
      <div class="d-grid">
        <button onclick="signup()" type="button" class="btn btn-outline-info submit-btn mt-2">
          Sign Up
        </button>
      </div>
      <h6 class="my-3 text-white">
        You have an account ?
        <button onclick="appendLoginFormToCard()" type="button" class="btn navigate-btn">
          Signin
        </button>
      </h6>
    <form/>`;
}

function checkSignUpValidation() {
  var nameInput = document.getElementById('nameInput'),
      emailInput = document.getElementById('emailInput'),
      passwordInput = document.getElementById('passwordInput'), 
      signupAlert = document.getElementById('signupAlert'),
      message = '',
      flag = false;
  if(!nameInput.value || !emailInput.value || !passwordInput.value) {
    message = "All fields are required";
  }
  else if(!nameRegex.test(nameInput.value)) {
    message = 'Name should contain alphabet only of at least two letters';
  }
  else if(!emailRegex.test(emailInput.value)) {
    message = 'Please insert correct email';
  }
  else if(!passwordRegex.test(passwordInput.value)) {
    message = 'Password Field should be at least 6 characters';
  }
  else if(userList.length > 0) {
    for(let i = 0; i < userList.length; i++) {
      if(userList[i].email == emailInput.value) {
        message = 'The email address you have entered already exists';
        break;
      }else {
        if(i === userList.length - 1) {
          flag = true;
          message = 'Success Signup Action';
        }
      }
    }
  }else {
    flag = true;
    message = 'Success Signup Action';
  }
  if(flag) {
    signupAlert.classList.add('text-success');
    signupAlert.classList.remove('text-danger');
  }else {
    signupAlert.classList.add('text-danger');
    signupAlert.classList.remove('text-success');
  }
  signupAlert.innerHTML = message;
  return flag;
}

function signup() {
  if(checkSignUpValidation()) {
    currentUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };
    userList.push(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userList', JSON.stringify(userList));
    setTimeout(function() {
      appendHomePage();
      logoutBtn.classList.replace('d-none','d-block');
    }, 2000)
  }
}

logoutBtn.addEventListener('click', function() {
  localStorage.removeItem('currentUser');
  logoutBtn.classList.replace('d-block','d-none');
  appendLoginFormToCard();
});