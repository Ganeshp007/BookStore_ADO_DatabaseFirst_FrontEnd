window.addEventListener('DOMContentLoaded', () => {
 
 //Declaration of regex Pattern varaible
 const regexFullName = RegExp('^([A-Z][A-Za-z]{3,20})+ +([A-Z][A-Za-z]{3,20})$');
 const regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][a-z]{2,5})+[.][a-z]{2,3}([.][a-z]{2,3})?$');
 const regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');
 const regexMobileNo = RegExp('^[1-9]{2}[6-9]{1}[0-9]{9}$');

 //Declaration of instance variables  and binding data to them
 const fullName = document.getElementById('Fname');
 const userName = document.getElementById('Uname');
 const password = document.getElementById('pass');
 const mobileNo = document.getElementById('MobileNo');
 const userSignup = document.querySelector('#Signup');

 const LoginEmail = document.getElementById('LoginEmail');
 const LoginPassword = document.getElementById('LoginPassword');
 const Login = document.getElementById('Login');

 let fn = 0, un = 0, psw = 0, mob = 0; LE=0;

 //function to show validation effects and hints
 const showError = (inputId, spanId, errMsg, beforeinput, afterinput) => {
    console.log('wd');
    console.log(errMsg);
    document.getElementById(inputId).classList.remove(beforeinput);
    document.getElementById(inputId).classList.add(afterinput);
    document.getElementById(spanId).classList.add('Errmsg');
    document.getElementById(spanId).classList.remove('form-hint');
    document.getElementById(spanId).innerHTML = errMsg;
    return false;
  };

  const showSuccess = (inputId, spanId, sucessMsg, beforeinput, afterinput) => {
    document.getElementById(inputId).classList.add(beforeinput);
    document.getElementById(inputId).classList.remove(afterinput);
    document.getElementById(spanId).classList.remove('Errmsg');
    document.getElementById(spanId).classList.add('form-hint');
    document.getElementById(spanId).textContent = sucessMsg;
    return true;
  };

  //Events for Input Fields
  fullName.addEventListener('keyup', () => {
    console.log(fullName.id);
    fn = check(fullName, 'beforeinput', 'afterinput', 'nameHint1', "Enter Valid First name", "", regexFullName)
  });

  userName.addEventListener('keyup', () => {
    console.log(userName.id);
    un = check(userName, 'beforeinput', 'afterinput', 'UsernameHint', "Enter Valid Email Id", "", regexEmail)
  });

  password.addEventListener('keyup', () => {
    console.log(password.id);
    psw = check(password, 'beforeinput', 'afterinput', 'passHint', "Enter Valid Password | Eg. Ram@1234", "", regexPass)
  });

  mobileNo.addEventListener('keyup', () => {
    console.log(mobileNo.id);
    mob = check(mobileNo, 'beforeinput', 'afterinput', 'MobHint', "Enter a valid Mobile No | Eg. 91+9988669988","", regexMobileNo);
  });

  //Function to check Validation using Regex pattern defined
  function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
    console.log(input.value, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex);
    if (!regex.test(input.value)) {
      a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    } else {
      a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
  };

  //Event which triggers AddUser API
  userSignup.addEventListener('click', () => {
    let Userdata = {
      fullName: fullName.value,
      emailId: userName.value,
      password: password.value,
      mobileNo: mobileNo.value,
    }
    console.log(Userdata);
    $.ajax({
      url: "https://localhost:44358/User",
      type: "POST",
      data: JSON.stringify(Userdata),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        console.log(result);
        alert('User SignUp Sucessfull...Please Login');
        ResetSignupPage();
        window.location.href='http://127.0.0.1:5501/Pages/User/LoginAndSignup.html';
      },
      error: function (error) {
        console.log(error);
      }
    })
  })

  //function to reset input fields
  function ResetSignupPage(){
    userName.value='';
    password.value='';
  }

  //Event triggers Login API
  Login.addEventListener('click', () => {
    let Logindata = {
      emailId: LoginEmail.value,
      password: LoginPassword.value
    }
    console.log(Logindata);
    $.ajax({
      url: "https://localhost:44358/User/Login",
      type: "POST",
      data: JSON.stringify(Logindata),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (result) {
        alert('Login sucessfull')
        console.log(result);
        set_tokenWithExpiry('token', result.data, 7200000); //2hrs=7,200,000 ms
        ResetLoginPage();
        window.location.href = "http://127.0.0.1:5501/Pages/Home/Dashboard.html";
      },
      error: function (error) {
        console.log(error);
      }
    })
  })

  //function to set token with expiry
  function set_tokenWithExpiry(key, value, Extime) {
    const now = new Date()
    const token= {
      value: value,
      expiry: now.getTime() + Extime,
    }
    localStorage.setItem(key, JSON.stringify(token));
  }
  //function to reset input fields
  function ResetLoginPage(){
    LoginEmail.value = '';
    LoginPassword.value = '';
  }
})

//function to hide and show passwordusing eye icon For SIGNUP page
function Sshow(){
  var password= document.getElementById('pass');
  image= document.getElementById('eye2');
  if (password.type==="password") {
    password.type="text";
    image.setAttribute('src', `../../Assets/LoginAnsSignup/eyehide.png`);
  }else if (password.type==="text"){
    password.type="password";
    image.setAttribute('src', `../../Assets/LoginAnsSignup/eyeshow.png`);
  }
}

function Lshow(){
  var password= document.getElementById('LoginPassword');
  image= document.getElementById('eye1');
  if (password.type==="password") {
    password.type="text";
    image.setAttribute('src', '../../Assets/LoginAnsSignup/eyehide.png');
  }else if (password.type==="text"){
    password.type="password";
    image.setAttribute('src', '../../Assets/LoginAnsSignup/eyeshow.png');
  }
}