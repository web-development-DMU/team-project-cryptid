import getId from "./getid.js";
async function attemptRegister(e) {
    e.preventDefault();
    const   firstname = getId("firstname").value,
            lastname = getId("lastname").value,
            username = getId("username").value,
            email = getId("email").value,
            password = getId("password").value,
            confirmPassword = getId("confirmPassword").value;
    await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password,
            confirmPassword
        })
    });

}