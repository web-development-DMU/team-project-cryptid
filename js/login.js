import getId from "/js/getid.js";
import * as cookie from "https://deno.land/std/http/cookie.ts";

console.log("script loaded");

document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = getId("email").value;
    const password = getId("password").value;

    try {
        // Send login data to server
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        // Log in
        if (result.success) {
            alert("login successful");
            const cookie = {name: 1, value: 1};
            setCookie()

            window.location.href = "/index.html";
        } else {
            alert("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
});