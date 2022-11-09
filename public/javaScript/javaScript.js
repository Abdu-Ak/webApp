
function validatingForm(form){
    firstName =document.getElementById("firstName");
    lasttName =document.getElementById("lastName");
    email =document.getElementById("email");
    password =document.getElementById("password");





    if(firstName.value == ""){
        document.getElementById('firstnameError').innerHTML="please enter your first name..! "
        firstName.focus();
        return false;
    }
     if(lastName.value == ""){
        document.getElementById('lastnameError').innerHTML="please enter your last name..! "
        lastName.focus();
        return false;
    }
     if(email.value == ""){
        document.getElementById('emailError').innerHTML="please enter your mail id..! "
        email.focus();
        return false;
    }
      const re =
       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     if(!re.test(email.value)){
        document.getElementById('emailError').innerHTML="please enter valid email..! "
        email.focus();
        return false;
    }
    if(password.value == ""){
        document.getElementById('passwordError').innerHTML="please enter your password..! "
        password.focus();
        return false;
    }
    return true;

}