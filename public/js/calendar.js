let currentDate = new Date(),
    selectedDayDiv = null;

// Get calendar and date elements
const calendar = document.getElementById("calendar"),
    monthYear = document.getElementById("month-year"),

// Get new task elements
    newTask = document.getElementById("newTask"),
    taskName = document.getElementById("taskName"),
    taskStart = document.getElementById("taskStartDate"),
    taskEnd = document.getElementById("taskEndDate"),
    taskCompleted = document.getElementById("taskCompleted");

function renderCalendar() {

    // Clear calendar
    calendar.innerHTML = "";

    // Clear input fields
    document.getElementById("taskName").value = "";
    document.getElementById("taskStartDate").value = "";
    document.getElementById("taskEndDate").value = "";

    // Get current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Display month and year
    monthYear.textContent = currentDate.toLocaleString("default", { month: "long" }) + " " + year;

    // Get first day in current month and days in said month
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

        // Add click listener to allow tasks for that day to be displayed
        div.addEventListener("click", () => {
            const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            loadTasks(selectedDate);

            // Remove highlight from previously selected day
            if (selectedDayDiv) {
                selectedDayDiv.classList.remove("selected");
            }

            // Highlight the clicked day
            div.classList.add("selected");
            selectedDayDiv = div;
        });

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

    // Load tasks for current date
    loadTasks(currentDate.toISOString().split("T")[0]);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function getTaskTimeLeft(startDate, endDate) {
    const now = new Date(new Date(Date.now()).toISOString().split("T")[0]), // current time
        end = new Date(endDate);

    const diffMs = end - now; // difference in milliseconds
    console.log(diffMs);
    if (diffMs == 0) return "Due today"; // exactly one day left
    else if (diffMs < 0) return "Past due"; // already finished

    // Convert milliseconds to days, hours, minutes
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    let result = "";
    if (days >= 0) result += `${days}d `;

    return result;
}

// Function to get tasks with deadline of the day clicked
async function loadTasks(date) {
    const response = await fetch(`/tasks/by-date?date=${date}`);
    const tasks = await response.json();

    const table = document.querySelector("#daily-tasks table");
    table.innerHTML = `
        <tr>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Time Left</th>
        </tr>
    `;

    for (let task of tasks) {
        const row = document.createElement("tr");

        // Add event listener to show task details in newTask popup
        row.addEventListener("click", () => {
            newTask.style.display = 'flex';
            document.getElementById("backgroundCancel").style.display = 'block';
            document.querySelector('#newTask h2').textContent = 'Edit Task';
            document.getElementById("taskCompleted").style.display = 'block';
            document.getElementById("taskCompletedLabel").style.display = 'block';

            // Change form action to edit
            document.getElementById("taskForm").action = "/tasks/edit";

            // Add data to elements
            taskName.value = task.title;
            taskStart.value = task.start_date.toString();
            taskEnd.value = task.end_date.toString();
            taskCompleted.checked = task.completed === "on";
            taskId.value = task.id;
        });

        const taskTimeLeft = getTaskTimeLeft(task.start_date, task.end_date);

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.start_date}</td>
            <td>${task.end_date}</td>
            <td>${task.completed ? "Complete" : taskTimeLeft}</td>
        `;

        row.style.backgroundColor = task.completed === "on" ? "lightgreen" : taskTimeLeft === "Past due" && task.completed !== "on" ? "red" : "white";

        // Setting task ID. This is needed to be able to properly manipulate the desired task, as having tasks with the same details causes all of those tasks to be manipulated rather than just one
        row.taskId = task.id;

        table.appendChild(row);
    }
    if (tasks.length === 0) {
        table.innerHTML = "<tr><td colspan='3'>No tasks for this date.</td></tr>";
    }
}

renderCalendar();

// Get the form element
const taskForm = document.getElementById("taskForm");
const taskMessage = document.getElementById("errorMessage");

// Form submission event listener. Used to create user messages
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(taskForm),
        inEditMode = document.querySelector('#newTask h2').textContent === 'Edit Task';
    let response;
    // If in "edit" mode, send "edit" post, else send "add" post
    response = await fetch(`/tasks/${inEditMode ? 'edit' : 'add'}`, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        // Task added successfully
        taskMessage.textContent = `Task ${inEditMode ? 'edited' : 'added'} successfully!`;
        taskMessage.classList.remove("text-danger");
        taskMessage.classList.add("text-success");

        // Timeout to close pop-up. May change to instant remove  depending on UX
        setTimeout(() => {
            document.getElementById("newTask").style.display = "none";
            document.getElementById("backgroundCancel").style.display = "none";
        }, 1000);

        // Clear the form
        taskForm.reset();
    } else {
        // Server returned an error
        if (response.status === 410) {
            taskMessage.textContent = "All fields are required";
        } else if (response.status === 411) {
            taskMessage.textContent = "Start date is after end date";
        } else if (response.status === 412) {
            taskMessage.textContent = "Invalid date format";
        }
        taskMessage.classList.remove("text-success");
        taskMessage.classList.add("text-danger text-center");
    }
    window.location.reload();
});