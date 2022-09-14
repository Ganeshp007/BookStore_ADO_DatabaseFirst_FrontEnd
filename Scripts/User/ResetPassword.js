window.addEventListener('DOMContentLoaded', () => {
 
    //Declaration of regex Pattern varaible
    const regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');
   
    //Declaration of instance variables  and binding data to them
    const Npass = document.getElementById('Npass');
    const Cpass = document.getElementById('Cpass');
    const Resetpass = document.querySelector('#resetpass');
    let np = 0, cp = 0;

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
    Npass.addEventListener('keyup', () => {
       console.log(Npass.id);
       np = check(Npass, 'beforeinput', 'afterinput', 'NPHint', "Enter Valid password | Eg. Ramesh@1234", "", regexPass)
    });

    Cpass.addEventListener('keyup', () => {
        console.log(Cpass.id);
        cp = matchpassword(Cpass, 'beforeinput', 'afterinput', 'CPHint', "New Password and Confirm Password must match", "")
    });
   
    //Function to match password and Confirmpassword
    function matchpassword(Cpass, beforeinput, afterinput, spanId, errMsg, sucessMsg) {
    if (Npass.value != Cpass.value) {
      a = showError(Cpass.id, spanId, errMsg, beforeinput, afterinput);
      return 0;
    }
    else {
      a = showSuccess(Cpass.id, spanId, sucessMsg, beforeinput, afterinput);
      return 1;
    }
    };
    
    //Function to check Validation using Regex pattern defined
    function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
       if (!regex.test(input.value)) {
         a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
         return 0;
       } else {
         a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
         return 1;
       }
    };
   
    //Event which triggers AddUser API
    Resetpass.addEventListener('click', () => {
       $.ajax({
         url: `https://localhost:44358/User/ForgotPassword/${emailId.value}`,
         type: "POST",
         success: function (result) {
           console.log(result);
           alert('Password Reset Link Sent Sucessfully...');
           ResetPageField();
        //    window.location.href='http://127.0.0.1:5500/Pages/User/LoginAndSignup.html';
         },
         error: function (error) {
           console.log(error);
         }
       })
    })
   
    //function to reset input fields
    function ResetPageField(){
       emailId.value='';
    };

})