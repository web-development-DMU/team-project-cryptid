import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { createUser, getUserByUsername, getUserByEmail } from "../models/accounts.js";
import { setFlash, getFlash } from "../tools/flash.js"
import getId from "../js/getid.js";

/**
 * Controller to handle user registration
 * @param {Request} request
 */
export async function createUserController(request) {
  const cookies = getCookies(request.headers);
  const session = cookies.session;
  const headers = new Headers();

  const formData = await request.formData();
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Basic input validation
  if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
    setFlash(headers, "All fields are required");
    headers.set('location', '/register');
    return new Response(null, { headers: headers, status: 303 })
    // return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    console.log("missing input")
  }

  if (password !== confirmPassword) {
    setFlash(headers, "Passwords do not match");
    headers.set('location', '/register');
    return new Response(null, { headers: headers, status: 303 })
    // return new Response(JSON.stringify({ success: false, message: "Passwords do not match" }), { status: 400 });
    console.log("passwords don't match")
  }

  // DB duplicate validation
  if (await getUserByUsername(username)) {
    setFlash(headers, "Username already in use");
    headers.set('location', '/register');
    return new Response(null, { headers: headers, status: 303 })
    // return new Response(JSON.stringify({ success: false, message: "Username already in use" }), { status: 409 });
    console.log("username already in use")
  }

  if (await getUserByEmail(email)) {
    setFlash(headers, "Email already in use");
    headers.set('location', '/register');
    return new Response(null, { headers: headers, status: 303 })
    // return new Response(JSON.stringify({ success: false, message: "Email already in use" }), { status: 409 });
    console.log("email already in use")
  }

  // Currently stored in plain text (obviously not secure)
  // Will hash password once functionality is complete
  await createUser({firstname, lastname, username, email, password});
  console.log(await getUserByUsername(username));

  // Create response and session cookie
  setCookie(headers, {
    name: "session",
    value: email,
    path: '/",'    //no maxage yet as to be able to polish login and register
    maxAge: 20 // 10 seconds. Lengthen when register is polished
  })
  headers.set('Location', '/home');
  return new Response(null, { headers, status: 303 });
}