// controllers/logout.js
import { deleteCookie } from "https://deno.land/std/http/cookie.ts";

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

  // Delete cookie
  deleteCookie(response.headers, "session", { path: "/" });

  return response;
}