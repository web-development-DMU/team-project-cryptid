import getId from "/js/getid.js";

export async function registerController(request) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    cookies = getCookies(request.headers),
    session = cookies.session;
    
}