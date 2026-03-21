import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getUserByUsername, getUserByEmail } from "../../models/accounts.js";

export async function loginHandler(request) {
  const body = await request.json();
  const {email, password} = body;

  //incorrect email returns Promise { undefined}
  //no fucking idea how to fix this
  if (!(getUserByEmail(email))) {
    document.getElementById("incorrect").style.display = "block";
  }
  if (email === "test@test.com" && password === "1234") {
    const headers = new Headers();

    setCookie(headers, {
      name: "session",
      value: email,
      path: "/",
      // maxAge: 60 * 2 // 2 minutes. Lengthen when login is polished
    });

    return new Response(JSON.stringify({success: true}), {headers});
  }

  return new Response(JSON.stringify({success: false}), {status: 401});
}