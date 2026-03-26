export function viewRegister(flash) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/public/styles/login.css">
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
}