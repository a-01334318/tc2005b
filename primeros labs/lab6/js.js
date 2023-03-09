function validate()
{
    let password = document.getElementById("password").value;
    let validatePassword = document.getElementById("validate-password").value;
    let message = document.getElementById("message");

    if (password != validatePassword)
    {
        message.innerHTML = "Passwords do not match";
        return false;
    } 
    
    else if (password == validatePassword && password != "" && validatePassword != "")
    {
        message.innerHTML = "Passwords match";
        return true;
    }
}