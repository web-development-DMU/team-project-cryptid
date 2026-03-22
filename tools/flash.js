import { deleteCookie, getCookies, setCookie } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { encodeBase64Url, decodeBase64Url } from "@std/encoding";

export function setFlash(headers, message) {
    setCookie(headers, {
        name: "flash",
        value: encodeBase64Url(message),
        path: "/"
    });
}

export function getFlash(requestHeaders, responseHeaders) {
    const { flash } = getCookies(requestHeaders);
    if (flash) {
        deleteCookie(responseHeaders, "flash", { path: "/"});

        return `
        <aside id="flash">
            <p>${new TextDecoder().decode(decodeBase64Url(flash))}</p>
        </aside>
        `
    } else return '';
}