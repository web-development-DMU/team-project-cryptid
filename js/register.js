document.getElementById("register").addEventListener("submit", async (e) => {
    e.preventDefault();

    const   firstname = getId("firstname").value,
            lastname = getId("lastname").value,
            username = getId("username").value,
            email = getId("email").value,
            password = getId("password").value,
            confirmPassword = getId("confirmPassword").value;

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            credentials: "include", // Important as cookies may not be handled properly
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstname, lastname, username, email, password, confirmPassword })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = "/login";
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});