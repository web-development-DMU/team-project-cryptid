// fetch header HTML
fetch('/html/header.html').then(response => response.text()).then(data => document.body.innerHTML = data + document.body.innerHTML);