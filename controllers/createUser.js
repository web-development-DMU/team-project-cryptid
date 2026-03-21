import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { createUser, getUserByUsername, getUserByEmail } from "../models/accounts.js";

/**
 * Controller to handle user registration
 * @param {Request} request
 */
export async function createUserController(request) {
  try {
    // Parse JSON body from request
    const body = await request.json(),
          {firstname, lastname, username, email, password, confirmPassword} = body;

    // Basic input validation
    if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ success: false, message: "Passwords do not match" }), { status: 400 });
    }

    // DB duplicate validation
    if (getUserByUsername(username)) {
      //set error element here
      return new Response(JSON.stringify({ success: false, message: "Username already in use" }), { status: 409 });
    }

    if (getUserByEmail(email)) {
      //set error element here
      return new Response(JSON.stringify({ success: false, message: "Email already in use" }), { status: 409 });
    }


    // Currently stored in plain text (obviously not secure)
    // Will hash password once functionality is complete
    await createUser({firstname, lastname, username, email, password});

    // Create response and session cookie
    const response = new Response(JSON.stringify({ success: true, message: "User registered successfully" }), { status: 201 });
    setCookie(response.headers, {
      name: "session",
      value: email,
      path: "/",
      //no maxage yet as to be able to polish login and register
      // maxAge: 60 * 2 // 2 minutes. Lengthen when register is polished
    })

    return response;
  } catch (err) {
    console.error("Error creating user:", err);
    return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
  }
}