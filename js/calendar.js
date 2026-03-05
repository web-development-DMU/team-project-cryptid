document.title = "Calendar";

let currentDate = new Date();

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("month-year");

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent =
        currentDate.toLocaleString("default", { month: "long" }) + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add day headers
    for (let day of days) {
        const div = document.createElement("div");
        div.textContent = day;
        div.classList.add("day-header");
        calendar.appendChild(div);
    }

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement("div");
        div.textContent = day;

        const today = new Date();
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            div.classList.add("today");
        }

        calendar.appendChild(div);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

renderCalendar();