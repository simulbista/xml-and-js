function displayFormData() {
    let email = document.getElementById('email').value;
    let dov = document.getElementById('dov').value;
    let comment = document.getElementById('comment').value;

    console.log(email);
    document.getElementById("emailDisplay").innerHTML = email;
    document.getElementById("dovDisplay").innerHTML = dov;
    document.getElementById("commentDisplay").innerHTML = comment;
    return false;
}