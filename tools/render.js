// export function render() {
//     const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
//     <link rel="stylesheet" href="styles/login.css">
//     <title>Login</title>
// </head>
// <body>
//     <main>
//         <h1 id="title">Login</h1><br>
//         <form id="login" class="d-flex flex-column">
//             <label for="email">Email Address</label><br>
//             <input type="text" id="email" name="email" class="rounded"><br><br><br>
//             <label for="password">Password</label><br>
//             <input type="password" id="password" name="password" class="rounded"><br><br>
//             <input type="submit" id="submit" value="Login"><br><br>
//             <p id="switch">No account? <a href="/register">Register here</a></p>
//         </form>
//     </main>
// </body>
// </html>
//     `
//     const headers = { "content-type": "text/html" }
//     return new Response(html, { headers })
// }
export function render(page) {
    let html;
    switch (page) {
        case "header": 
            html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
                    <link rel="stylesheet" href="/styles/header.css"></style>
                    <title>Header</title>
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
                                <li class="nav-item"><a class="nav-link px-3" href="/html/index.html">Home</a></li>
                                <li class="nav-item"><a class="nav-link px-3" href="/html/leaderboard.html">Leaderboard</a></li>
                                <li class="nav-item"><a class="nav-link px-3" href="/html/progression.html">Progression</a></li>
                                <li class="nav-item"><a class="nav-link px-3" href="/html/calendar.html">Calendar</a></li>
                            </ul>
                        </div>

                        <!-- Profile picture -->
                        <div id="profile-dropdown" class="dropdown ms-auto">
                            <a href="#" class="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/assets/profile-placeholder.jpg" alt="User" class="rounded-circle profile-img">
                            </a>

                            <!-- Profile dropdown -->
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><a class="dropdown-item" href="/html/profile.html">My Profile</a></li>
                                <li><a class="dropdown-item" href="/html/progression.html">My Progress</a></li>
                                <li><a class="dropdown-item" href="/html/preferences.html">Preferences</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                </header>
            `;
            break;
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
                        <form id="login" class="d-flex flex-column">
                            <label for="email">Email Address</label><br>
                            <input type="text" id="email" name="email" class="rounded"><br><br><br>
                            <label for="password">Password</label><br>
                            <input type="password" id="password" name="password" class="rounded"><br><br>
                            <input type="submit" id="submit" value="Login"><br><br>
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
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                    <script src="/js/register.js"></script>
                    <link rel="stylesheet" href="/styles/login.css">
                    <title>Register</title>
                </head>
                <body id="register-main">
                    <main>
                        <h1 id="title">Register</h1> 
                        <form id="register" class="d-flex flex-column">
                            <label for="firstname">First Name</label><br>
                            <input type="text" id="firstname" name="firstname"><br><br>
                            <label for="lastname">Last Name</label><br>
                            <input type="text" id="lastname" name="lastname"><br><br>
                            <label for="username">Username</label><br>
                            <input type="text" id="username" name="username"><br><br>
                            <label for="email">Email Address</label><br>
                            <input type="text" id="email" name="email"><br><br>
                            <label for="password">Password</label><br>
                            <input type="password" id="password" name="password"><br><br>
                            <label for="confirmPassword">Confirm Password</label><br>
                            <input type="password" id="confirmPassword" name="confirmPassword"><br><br>
                            <input type="submit" id="submit" name="submit" value="Register">
                            <p id="switch">Already have an account? <a href="/login">Login here</a></p>
                        </form>
                    </main>
                </body>
                </html>
            `;
            break;
        case "home":
            html = `
                <!-- These two lines are needed on each page for the navbar to function properly. Reason unknown but the Bootstrap JS doesn't carry over files -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                <script src="/js/header.js"></script>
                <link rel="stylesheet" href="/styles/index.css">
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
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
                                <p class="upcoming-details">Name1</p>
                                <p class="upcoming-details middle">Time1</p>
                                <p class="upcoming-details">XP1</p>
                            </div>
                            <div class="upcoming-task d-flex" onclick="location.href='header.html'">
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
                                <input type="button" id="view-all-tasks-btn" class="rounded border border-1 border-dark" onclick="location.href='calendar.html'" value="View All Tasks">
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
            html = `
                <!-- These two lines are needed on each page for the navbar to function properly. Reason unknown but the Bootstrap JS doesn't carry over files -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                <script src="/js/header.js"></script>
                <script src="/js/profile.js" defer></script>
                <link rel="stylesheet" href="/styles/profile.css">
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
            html = `
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
                <script src="/js/header.js"></script>
                <link rel="stylesheet" href="/styles/calendar.css">
                <!--
                    What this page needs (mostly in scripting):
                        on load, day tasks pane shows tasks for current day
                        clicking a day displays pop-up with the day's tasks;
                        clicking a task within the day shows task details;
                        clicking back button on task details hides pane/directs back to day tasks
                -->
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
                            <table>
                                <tr>
                                    <td>Task 1</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">50XP</td>
                                </tr>
                                <tr>
                                    <td>Task 2</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">10XP</td>
                                </tr>
                                <tr>
                                    <td>Task 3</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">35XP</td>
                                </tr>
                                <tr>
                                    <td>Task 2</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">10XP</td>
                                </tr>
                                <tr>
                                    <td>Task 2</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">10XP</td>
                                </tr>
                                <tr>
                                    <td>Task 2</td>
                                    <td class="cell-shrink">Time Left</td>
                                    <td class="cell-shrink">% Complete</td>
                                    <td class="cell-shrink">10XP</td>
                                </tr>
                            </table>
                                <!-- If tasks can span multiple days, add task will autofill the start date for the day being viewed -->
                                <input type="button" id="add-task-btn" class="add-task-btn rounded" value="Add Task" onclick="/*display new task section or redirect to new task page*/">
                        </div>
                    </div>
                    <!-- this pane will display the task details that the user hovers over, allowing much easier design, scaling and positioning -->
                    <!-- The pane will be displayed just above the user's cursor (but NOT follow it), making positioning the pane much easier -->
                    <!-- There will be a simple script to move the pane and fill the details with the hovered task. The pane will not be clickable in any way -->
                    <div id="task-view-pane" class="rounded">
                        <p id="task-name">Name</p>
                        <p id="task-tile">Time left</p>
                        <p id="task-percentage">% Complete</p>
                        <p id="task-objective">Objective 1</p>
                        <p id="task-objective">Objective 2</p>
                        <p id="task-objective">Objective 3</p>
                        <p id="task-xp">50xp</p>
                    </div>
                    <!-- Either import task detail file or create in each page it is required -->
                </main>
                <script src="/js/calendar.js"></script>
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
    const headers = { "content-type": "text/html" }
    return new Response(html, { headers })
}