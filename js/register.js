import getId from "/js/getid.js";

document.getElementById("register").addEventListener("submit", async (e) => {
    e.preventDefault();

    const   firstname = getId("firstname").value,
            lastname = getId("lastname").value,
            username = getId("username").value,
            email = getId("email").value,
            password = getId("password").value,
            confirmPassword = getId("confirmPassword").value;

    let response, result;

    // Catch fetch/network errors
    try {
        response = await fetch("/api/register", {
            method: "POST",
            credentials: "include", // Important as cookies may not be handled properly
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstname, lastname, username, email, password, confirmPassword})
        });
    } catch(err) {
        console.error("Network or fetch error:", err);
        alert("Unable to contact server. Please try again.");
        return;
    }

    // Catch JSON parsing errors
    try {
        result = await response.json();
    } catch(err) {
        console.error("Error parsing JSON response:", err);
        alert("Server returned invalid data.");
        return;
    }

    // Handling result logic
    try {
        if (result.success) {
            window.location.href = "/home";
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error("Error handling response result:", err);
        alert("Unexpected error occurred.");
    }
});