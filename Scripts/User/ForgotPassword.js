window.addEventListener('DOMContentLoaded', () => {
 
    //Declaration of regex Pattern varaible
    const regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][a-z]{2,5})+[.][a-z]{2,3}([.][a-z]{2,3})?$');
   
    //Declaration of instance variables  and binding data to them
    const emailId = document.getElementById('EmailId');
    const sendmail = document.querySelector('#sendmail');

    let un = 0;
   
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
     emailId.addEventListener('keyup', () => {
       console.log(emailId.id);
       un = check(emailId, 'beforeinput', 'afterinput', 'EmailHint', "Enter Valid Email address", "", regexEmail)
     });
   
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
     sendmail.addEventListener('click', () => {
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
    }

})
