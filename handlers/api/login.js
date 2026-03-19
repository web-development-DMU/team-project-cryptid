import { setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";

export async function loginHandler(request) {
  const body = await request.json();
  const {email, password} = body;

  if (email === "test@test.com" && password === "1234") {
    const headers = new Headers();

    setCookie(headers, {
      name: "sessionID",
      value: email,
      path: "/",
      httpOnly: true
    });

    return new Response(JSON.stringify({success: true}), {headers});
  }

  return new Response(JSON.stringify({success: false}), {status: 401});
}