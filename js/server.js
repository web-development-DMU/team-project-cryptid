//import { serve } from "std/http";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { serveDir } from "@std/http";
import { notFound } from "../handlers/notFound.js";
import { render } from "../tools/render.js";
import { loginHandler } from "../handlers/api/login.js";
import { createUserController } from "../controllers/createUser.js";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";

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
  const path = new URL(request.url).pathname,
        method = request.method,
        cookies = getCookies(request.headers),
        session = cookies.session;
  console.log("Request for: " + path)
  console.log("session: " + session);
  // console.log(`Request for: ${path}, method: ${method}`)
  
  //layout for page/file requests
  if (path == "certain/path" && method == "GET") return handler;;

  // Redirect from localhost/ based on login status
  if ((path === "/" || path === "") && method === "GET") {
    /*
      if login cookie exists, go to home page
      else go to login
    */
    if (session) {
      return new Response(null, {
        status: 302,
        headers: {Location: "/home"},
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: {Location: "/login"},
      });
    }
  }

  // Serving page routes
  if (path !== "/login" && path !== "/register" && path !== "/logout" && method === "GET") render("header");
  if (path === "/login" && method === "GET") return render("login");
  if (path === "/register" && method === "GET") return render("register");

  if (session) {
    if (path === "/home" && method === "GET") return render("home");
    if (path === "/profile" && method === "GET") return render("profile");
    if (path === "/calendar" && method === "GET") return render("calendar");
    if (path === "/leaderboard" && method === "GET") return render("leaderboard");
    if (path === "/preferences" && method === "GET") return render("preferences");
    if (path === "/progression" && method === "GET") return render("progression");
    if (path === "/logout" && method === "GET") return render("logout");
  } else if (!path.includes("/styles") && !path.includes("/assets")) {
    return new Response(null, {
      status: 302,
      headers: {Location: "/login"},
    });
  }

  
  // Serving static files
  if (method == "GET") 
    try {
      return await serveFile(request, "." + path);
    } catch { // Fall through if file doesn't exist
      console.error("File does not exist");
      return new Response(JSON.stringify({success: false}), {status: 404})
    }
  
  return render();

  // Handling user login
  if (path === "/api/login" && method === "POST") {
    return loginHandler(request);
  }

  // Handling user registration
  if (path === "/api/register" && method === "POST") {
    return createUserController(request);
  }
}



Deno.serve(server);