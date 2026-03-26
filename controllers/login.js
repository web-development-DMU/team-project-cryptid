import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getUserByUsername, getUserByEmail, getPasswordByEmail, userExists } from "../models/accounts.js";
import { setFlash } from "../tools/flash.js";

export async function loginController(request) {
  
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await getUserByEmail(email);

  const headers = new Headers();

  if (!await userExists(email)) {
    setFlash(headers, "User not found.");
    headers.set('location', '/login');
    return new Response(null, { headers, status: 303 });
  }

  if (await userExists(email) && password === user.password) {
    
    setCookie(headers, {
      name: "session",
      value: user.username,
      path: "/",
      //maxAge: 60 * 2 // 2 minutes. Lengthen when login is polished
    });
    headers.set('location', '/home');
    return new Response(null, { headers, status: 303 });
  }

  setFlash(headers, "Incorrect password.")

  headers.set('location', '/login');
  return new Response(null, { headers, status: 303 });
}