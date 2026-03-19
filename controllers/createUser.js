// controllers/createUser.js
import { createUser } from "../models/accounts.js";

/**
 * Controller to handle user registration
 * @param {Request} request
 */
export async function createUserController(request) {
  try {
    // Parse JSON body from request
    const body = await request.json();
    const { firstname, lastname, username, email, password, confirmPassword } = body;

    // Basic validation
    if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ success: false, message: "Passwords do not match" }), { status: 400 });
    }

    // Currently stored in plain text (obviously not secure)
    // Will hash password once functionality is complete
    await createUser({ username, password });

    return new Response(JSON.stringify({ success: true, message: "User registered successfully" }), { status: 201 });

  } catch (err) {
    console.error("Error creating user:", err);
    return new Response(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
  }
}