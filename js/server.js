//import { serve } from "std/http";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

// async function server(request) {
//     const path = new URL(request.url).pathname;
//     console.log("Request for: ", path);

//     return serveFile(request, "./index.html");
// }

export function server(request) {
  const path = new URL(request.url).pathname;
  console.log("Request for:", path);

  let filePath = "." + path;

  // default page
  if (path === "/") {
    filePath = "./index.html";
  }

  return serveFile(request, filePath);
}

Deno.serve(server);