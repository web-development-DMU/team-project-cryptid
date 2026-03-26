function getId(what) {
    return document.getElementById(what);
}

getId("login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const   email = getId("email").value,
            password = getId("password").value;
    let response, result;

    // Send login data to server, catch errors
    try {
        response = await fetch("/api/login", {
            method: "POST",
            credentials: "include", // Important as cookies may not be handled properly
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
    } catch(err) {
        console.error("Network or fetch error:", err);
        alert("Unable to contact server. Please try again.");
        return;
    }

    // Catch JSON parsing errors
    try {
        const contentType = response.headers.get("Content-Type");
        if (!contentType?.includes("application/json")) { // If contentType doesn't include "application/json"
            throw new Error(`Expected JSON, got ${contentType}`);
        }
        result = await response.json();
    } catch(err) {
        console.error("Error parsing JSON response:", err);
        alert("Server returned invalid data.");
        return;
    }

    // Handling login result
    try {
        if (result.success) {
            window.location.href = "/home";
        } else {
            alert(result.message || "Invalid email or password");
        }
    } catch (err) {
        console.error("Error handling response result:", err);
        alert("Unexpected error occurred.");
    }
});