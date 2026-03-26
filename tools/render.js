import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getFlash } from "../tools/flash.js";
import { viewLogin } from "../public/views/login.js";
import { viewRegister } from "../public/views/register.js";
import { viewHome } from "../public/views/index.js";
import { viewProfile } from "../public/views/profile.js";
import { viewCalendar } from "../public/views/calendar.js";

export function render(page, request, user = null) {
    const headers = new Headers();
    headers.set('content-type', 'text/html');
    const flash = getFlash(request.headers, headers)

    let html;
    const headerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/public/styles/header.css">
            <link rel="stylesheet" href="/public/styles/${page == "home" ? "index" : page}.css">
            ${page == "calendar" || page == "home" ? '<link rel="stylesheet" href="/public/styles/addTask.css">' : ''}
            <script src="/public/js/${page == "home" ? "index" : page}.js" ${page == 'profile' || page == 'calendar' || page == 'home' ? 'defer' : ''}></script>
            <title>${page[0].toUpperCase() + page.slice(1)}</title>
        </head>
        <body>
        <nav class="navbar navbar-expand-sm navbar-light custom-navbar">
            <div class="container-fluid">

                <!-- Hamburger menu -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Collapsible nav links -->
                <div class="collapse navbar-collapse ms-auto" id="mainNavbar">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item"><a class="nav-link px-3" href="/home">Home</a></li>
                        <li class="nav-item"><a class="nav-link px-3" href="/leaderboard">Leaderboard</a></li>
                        <li class="nav-item"><a class="nav-link px-3" href="/progression">Progression</a></li>
                        <li class="nav-item"><a class="nav-link px-3" href="/calendar">Calendar</a></li>
                    </ul>
                </div>

                <!-- Profile picture -->
                <div id="profile-dropdown" class="dropdown ms-auto">
                    <a href="#" class="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/assets/profile-placeholder.jpg" alt="User" class="rounded-circle profile-img" alt="User's profile picture in page header">
                    </a>

                    <!-- Profile dropdown -->
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a class="dropdown-item" href="/profile">My Profile</a></li>
                        <li><a class="dropdown-item" href="/progression">My Progress</a></li>
                        <li><a class="dropdown-item" href="/preferences">Preferences</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/logout">Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        </header>`;
    switch (page) {
        case "login":
            html = viewLogin(flash);
            break;
        case "register":
            html = viewRegister(flash);
            break;
        case "home":
            html = headerHTML + viewHome(user);
            break;
        case "profile":
            html = headerHTML + viewProfile(user);
            break;
        case "calendar":
            html = headerHTML + viewCalendar();
            break;
        case "leaderboard":
            html = `
            `;
            break;
        case "preferences":
            html = `
            `;
            break;
        case "progression":
            html = `
            `;
            break;
        case "logout":
            html = `
            `;
            break;
    }

    if (!html || html.trim() === "") {
        return new Response("Not Found", { status: 404 });
    }
    
    return new Response(html, { headers })
}