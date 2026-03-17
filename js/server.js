//import { serve } from "std/http";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { db } from "./db.js";
import { serve } from "std/http";
import findUser from "./models/users.js";

// async function server(request) {
//     const path = new URL(request.url).pathname;
//     console.log("Request for: ", path);

//     return serveFile(request, "./index.html");
// }

/*export function server(request) {
  const path = new URL(request.url).pathname;
  console.log("Request for:", path);

  let filePath = "." + path;

  // default page
  if (path === "/") {
    filePath = "./index.html";
  }

  return serveFile(request, filePath);
}*/
export default async function server(request) {
  const url = new URL(request.url),
        path = url.pathname;

  console.log("Request for:", path);

  // login API
  if (path === "/api/login" && request.method === "POST") {
    const body = await request.json(),
          email = body.email,
          password = body.password,

          result = [...db.query(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            [email, password]
          )];
    return Response.json({result: result});
  }

  let filePath = "." + path;

  // login cookie
  const cookie = request.headers.get("cookie");
  console.log(cookie);

  // default to index page (redirected to login if no valid login cookie
  if (path ==="/") {
    if (!cookie || !cookie.includes("session=")) filePath = "./html/login.html";
    else filePath = "./html/index.html";
  }

  // if user already has login cookie, redirect from login/register to index
  if (path === "./html/login.html" || path === "./html/register.html") {
    if (cookie)
    if (cookie || cookie.includes("session=")) filePath = "./html/index.html";
  }
  
  return serveFile(request, filePath);
}

Deno.serve(server);