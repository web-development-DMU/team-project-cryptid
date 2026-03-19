import getId from "/js/getid.js";

console.log("script loaded");

document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = getId("email").value;
    const password = getId("password").value;

    try {
        // Send login data to server
        const response = await fetch("/api/login", {
            method: "POST",
            credentials: "include", // Important as cookies may not be handled properly
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        const result = await response.json();

        // Log in
        if (result.success) {
            alert("login successful");
            window.location.href = "/home";
        } else {
            alert("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});