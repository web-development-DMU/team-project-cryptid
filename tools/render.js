import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getFlash } from "../tools/flash.js"


export function render(page, request) {
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
            <link rel="stylesheet" href="/styles/header.css">
            <link rel="stylesheet" href="/styles/${page == "home" ? "index" : page}.css">
            ${page == "calendar" ? '<link rel="stylesheet" href="/styles/addTask.css">' : ''}
            <script src="/js/${page == "home" ? "index" : page}.js" ${page == 'profile' || page == 'calendar' ? 'defer' : ''}></script>
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
                        <img src="/assets/profile-placeholder.jpg" alt="User" class="rounded-circle profile-img">
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
            html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                    <link rel="stylesheet" href="/styles/login.css">
                    <title>Login</title>
                </head>
                <body>
                    <main>
                        <h1 id="title">Login</h1><br>
                        <form id="login" class="d-flex flex-column", method="POST">
                            <label for="email">Email Address</label><br>
                            <input type="text" id="email" name="email" class="rounded"><br>
                            <label for="password">Password</label><br>
                            <input type="password" id="password" name="password" class="rounded"><br>
                            ${flash}
                            <input type="submit" id="submit" value="Login"><br>
                            <p id="switch">No account? <a href="/register">Register here</a></p>
                        </form>
                    </main>
                </body>
                </html>
            `;
            break;
        case "register":
            html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                    <link rel="stylesheet" href="/styles/login.css">
                    <title>Register</title>
                </head>
                <body id="register-main">
                    <main>
                        <h1 id="title">Register</h1> 
                        <form id="register" class="d-flex flex-column", method="POST">
                            <label for="firstname">First Name</label>
                            <input type="text" id="firstname" name="firstname" required/><br>
                            <label for="lastname">Last Name</label>
                            <input type="text" id="lastname" name="lastname" required/><br>
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required/><br>
                            <label for="email">Email Address</label>
                            <input type="text" id="email" name="email" required/><br>
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required/><br>
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required/><br>
                            <input type="submit" id="submit" name="submit" value="Register">
                            ${flash}
                            <p id="switch">Already have an account? <a href="/login">Login here</a></p>
                        </form>
                    </main>
                </body>
                </html>
            `;
            break;
        case "home":
            html = headerHTML + `
                <main class="d-flex">
                    <div id="side-l" class="divider">
                        <div id="user-details" class="container-fluid d-flex">
                            <img id="profile-picture" class="rounded-circle" src="/assets/profile-placeholder.jpg">
                            <p id="username" class="rounded">Username</p>
                            <div class=" d-flex rounded-circle h-100 border border-primary">
                                <p id="user-level">XP Level</p>
                            </div>
                        </div>
                        <!-- MAX OF 9 TASKS ALLOWED TO BE DISPLAYED -->
                        <div class="task-table rounded">
                            <!-- placeholders for upcoming tasks -->
                            <!-- Task IDs will be given based on the name of the task and the data-bs-target will be updated to the same name -->
                            <!-- clicking the task within the table will either redirect to a task details page, or pop-up a container which gets filled with the details of the clicked task. -->
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='#'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task last d-flex">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task-btns">
                                <input type="button" id="view-all-tasks-btn" class="rounded border border-1 border-dark" onclick="location.href='/calendar'" value="View All Tasks">
                                <input type="button" id="add-task-btn" class="add-task-btn rounded-circle" value="Add Task" onclick="/*display new task section or redirect to new task page*/">
                            </div>
                        </div>
                    </div>
                    <div id="side-r" class="divider">
                        <p class="recently-collected-title">Recent Items</p>
                        <div id="recently-collected" class="d-flex">
                            <div class="recent-item">
                                <img src="/assets/collectible-placeholder.jpg">
                            </div>
                            <div class="recent-item">
                                <img src="/assets/collectible-placeholder.jpg">
                            </div>
                            <div class="recent-item">
                                <img src="/assets/collectible-placeholder.jpg">
                            </div>
                            <div class="recent-item">
                                <img src="/assets/collectible-placeholder.jpg">
                            </div>
                        </div>
                        <div id="recent-activity">
                            <div class="recent-activity">
                                Friend levelled up
                            </div>
                            <div class="recent-activity">
                                Friend got achievement "achievement"
                            </div>
                            <div class="recent-activity">
                                Friend collected a new item: "item"
                            </div>
                            <div class="recent-activity">
                                Friend has reached new task streak
                            </div>
                        </div>
                    </div>
                </main>
            `;
            break;
        case "profile":
            html = headerHTML + `
                <main class="d-flex">
                    <div id="side-l" class="d-flex">
                        <!-- This may not be used at all -->
                        <h1 id="page-username">My Profile</h1>
                        <br>
                        <section class="border border-2 border-dark rounded">
                            <h3>Items Showcase</h3>
                            <div id="container-item-showcase">
                                <div class="favourite-item">
                                    <img src="/assets/collectible-placeholder.jpg">
                                </div>
                                <div class="favourite-item">
                                    <img src="/assets/collectible-placeholder.jpg">
                                </div>
                                <div class="favourite-item">
                                    <img src="/assets/collectible-placeholder.jpg">
                                </div>
                                <div class="favourite-item">
                                    <img src="/assets/collectible-placeholder.jpg">
                                </div>
                                <div class="favourite-item">
                                    <img src="/assets/collectible-placeholder.jpg">
                                </div>
                            </div>
                        </section>
                        <br><br>
                        <section class="border border-2 border-dark rounded">
                            <h3>All Items</h3>
                            <div id="container-all-items" class="item-grid"></div>
                        </section>
                    </div>
                    <!-- this side will be placed first when page collapses -->
                    <div id="side-r" class="d-flex">
                        <div class="container-profile">
                            <img id="profile-picture" class="rounded-circle" src="/assets/profile-placeholder.jpg">
                            <!-- This button will be replaced with an image of a pencil for "edit" -->
                            <input type="button" id="change-pfp-btn" class="profile-addition border border-1 border-dark rounded-circle" value="Change">
                            <p id="level-display" class="profile-addition border border-1 border-dark rounded-circle">27</p>
                        </div>
                        <div id="container-user-details">
                            <p id="username">Username</p>
                            <textarea id="bio" class="border border-2 border-dark rounded">About Me</textarea>
                        </div>
                        <div id="container-btns">
                            <input type="button" id="edit-profile-btn" class="border border-1 border-dark rounded" value="Edit Profile">
                            <input type="button" id="save-changes" class="border border-1 border-dark rounded" value="Save Changes">
                        </div>
                    </div>
                </main>
            `;
            break;
        case "calendar":
            html = headerHTML + `
                <main class="d-flex w-100">
                    <div id="calendar-container">
                        <div class="calendar-header">
                            <button onclick="changeMonth(-1)">←</button>
                            <h2 id="month-year"></h2>
                            <button onclick="changeMonth(1)">→</button>
                        </div>
                        <div class="calendar-grid" id="calendar"></div>
                    </div>
                    <div id="task-panes" class="d-flex">
                        <div id="daily-tasks">
                            <p id="daily-tasks-date">
                                March 3rd 2026
                            </p>
                            <section id="task-table-container">
                                <table>
                                    <tr>
                                        <td>Task 1</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">50XP</td>
                                    </tr>
                                    <tr>
                                        <td>Task 2</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">10XP</td>
                                    </tr>
                                    <tr>
                                        <td>Task 3</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">35XP</td>
                                    </tr>
                                    <tr>
                                        <td>Task 2</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">10XP</td>
                                    </tr>
                                    <tr>
                                        <td>Task 2</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">10XP</td>
                                    </tr>
                                    <tr>
                                        <td>Task 2</td>
                                        <td class="cell-shrink">Time Left</td>
                                        <td class="cell-shrink">10XP</td>
                                    </tr>
                                </table>
                            </section>
                                <!-- If tasks can span multiple days, add task will autofill the start date for the day being viewed -->
                                <input type="button" id="add-task-btn" class="add-task-btn rounded" value="Add Task" onclick="document.getElementById('taskForm').action = '/tasks/add'; document.getElementById('newTask').style.display = document.getElementById('newTask').style.display === 'none' ? 'flex' : 'none'; document.querySelector('#newTask h2').textContent = 'New Task'; document.getElementById('backgroundCancel').style.display = 'block'; document.getElementById('taskCompleted').style.display = 'none'; document.getElementById('taskCompletedLabel').style.display = 'none'; document.getElementById('taskForm').reset(); document.getElementById('taskCompleted').checked = false;">
                        </div>
                    </div>
                </main>
                <div id="backgroundCancel" onclick="document.getElementById('taskForm').reset(); document.getElementById('newTask').style.display = 'none'; document.getElementById('backgroundCancel').style.display = 'none'"></div>
                <div id="newTask" style="display: none !important;">
                    <h2>Add New Task</h2>
                    <form id="taskForm" method="POST" action="/tasks/add">
                        <section class="d-flex flex-column align-items-center mb-3">
                            <label for="taskName" class="form-label">Task Name</label>
                            <input type="text" class="form-control" id="taskName" name="taskName" required>
                        </section>
                        <section class="d-flex flex-column align-items-center mb-3">
                            <label for="taskStartDate" class="form-label">Start Date</label>
                            <input type="date" class="form-control date-input" id="taskStartDate" name="taskStartDate" required>
                        </section>
                        <section class="d-flex flex-column align-items-center mb-3">
                            <label for="taskEndDate" class="form-label">End Date</label>
                            <input type="date" class="form-control date-input" id="taskEndDate" name="taskEndDate" required>
                        </section>
                        <section class="form-check d-flex flex-row justify-content-center mb-3">
                            <input type="checkbox" class="form-check-input " id="taskCompleted" name="taskCompleted">
                            <label for="taskCompleted" class="form-check-label" id="taskCompletedLabel">Completed</label>
                        </section>
                        <div id="errorMessage" class=" text-center text-danger mb-3"></div>
                        <input type="submit" class="btn btn-primary mb-3" value="Save" id="submit" name="submit">
                        <input type="button" class="btn btn-secondary mb-3" value="Cancel" id="cancel" onclick="document.getElementById('taskForm').reset(); document.getElementById('newTask').style.display = 'none'; document.getElementById('backgroundCancel').style.display = 'none'">
                        <input type="hidden" id="taskId" name="taskId">
                    </form>
                </div>
            `;
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
    
    return new Response(html, { headers })
}