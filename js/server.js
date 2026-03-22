//import { serve } from "std/http";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { serveDir } from "@std/http";
import { notFound } from "../handlers/notFound.js";
import { render } from "../tools/render.js";
import { loginController } from "../controllers/login.js";
import { createUserController } from "../controllers/createUser.js";
import { logoutController } from "../controllers/logout.js";

export default async function server(request) {
  const url = new URL(request.url)
  const path = url.pathname,
        method = request.method,
        cookies = getCookies(request.headers),
        session = cookies.session;

  console.log(`${request.method} ${url.pathname}`);
  
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

  // ----------------
  //    API routes first, else they get skipped and return server error
  // ----------------
  // Handling user login
  if (path === "/login" && method === "POST" && !session) {
    return loginController(request);
  }

  // Handling user registration
  if (path === "/register" && method === "POST" && !session) {
    return createUserController(request);
  }

  // Handling user logout
  if (path === "/logout" && method === "POST") {
    return logoutController(request);
  }

  // Serving page routes
  if (path !== "/login" && path !== "/register" && path !== "/logout" && method === "GET") render("header");
  if (path === "/login" && method === "GET") return render("login", request);
  if (path === "/register" && method === "GET") return render("register", request);

  // if (session) {
    if (path === "/home" && method === "GET") return render("home", request);
    if (path === "/profile" && method === "GET") return render("profile", request);
    if (path === "/calendar" && method === "GET") return render("calendar", request);
    if (path === "/leaderboard" && method === "GET") return render("leaderboard", request);
    if (path === "/preferences" && method === "GET") return render("preferences", request);
    if (path === "/progression" && method === "GET") return render("progression", request);
    if (path === "/logout" && method === "GET") return render("logout", request);
  // } else if (!path.startsWith("/styles") && !path.startsWith("/assets") && !path.startsWith("/js")) {
  //   console.log("11")
  //   return new Response(null, {
  //     status: 302,
  //     headers: {Location: "/login"},
  //   });
  // }

  // Serving static files
  if (method == "GET") 
    try {
      return await serveFile(request, "." + path);
    } catch { // Fall through if file doesn't exist
      console.error("File does not exist");
      return new Response(JSON.stringify({success: false}), {status: 404})
    }
  
  return render();
}

// export default async function server(request) {

//   const url = new URL(request.url);
//   console.log(`${request.method} ${url.pathname}`);

//   if (url.pathname == "/") {
//     return new Response(null, {
//         status: 302,
//         headers: {Location: "/login"},
//       });
//   }

//   if (url.pathname === "/home" && request.method === "GET") return render("home");
//   if (url.pathname === "/login" && request.method === "GET") return render("login");
//   if (url.pathname === "/login" && request.method === "POST") {
//     console.log("s")

//     const headers = new Headers();
//     headers.set('location', '/home');
//     return new Response(null, { headers, status: 303 });
//   }

// }

Deno.serve(server);