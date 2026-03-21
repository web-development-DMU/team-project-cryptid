// controllers/logout.js
import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";

/**
 * Handles user logout
 * @param {Request} request
 */

export async function logoutController(request) {
  // Create a response that redirects the user to /login
  const response = new Response(null, {
    status: 302,
    headers: { Location: "/login" },
  });

  // Overwrite the session cookie with empty value and expire it immediately
  setCookie(response.headers, {
    name: "session",
    value: "",
    path: "/",       // must match the cookie path used when creating the session
    maxAge: 0,       // expires immediately
    httpOnly: true,  // security best-practice
    sameSite: "Strict",
  });

  return response;
}