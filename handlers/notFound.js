export function notFound(request) {
    const headers = { "content-type": "text/html" }
    const path = new URL(request.url).pathname;
    return new Response(`<p>${path} not found</p>`, { headers, status: 404 });
}