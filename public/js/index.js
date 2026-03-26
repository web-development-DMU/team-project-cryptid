let currentDate = new Date(),
    selectedDayDiv = null;

// Get new task elements
const newTask = document.getElementById("newTask"),
    taskName = document.getElementById("taskName"),
    taskStart = document.getElementById("taskStartDate"),
    taskEnd = document.getElementById("taskEndDate"),
    taskCompleted = document.getElementById("taskCompleted");

function getTaskTimeLeft(startDate, endDate) {
    const now = new Date(new Date(Date.now()).toISOString().split("T")[0]), // current time
        end = new Date(endDate);

    const diffMs = end - now; // difference in milliseconds
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
    const response = await fetch(`/tasks/all?date=${date}`);
    const tasks = await response.json();

    const table = document.getElementById("task-table");
    table.innerHTML = `
        <tr>
            <th>Task Name</th>
            <th>Time Left</th>
        </tr>
    `;
    let index = 0,
        rowsMade = 0;
    for (index; rowsMade < 9; index ++) {
        const task = tasks[index];

        if (!tasks[index]) break;

        const row = document.createElement("tr"),
            taskTimeLeft = getTaskTimeLeft(task.start_date, task.end_date);
        console.log(taskTimeLeft)
        if (taskTimeLeft === "Past due") continue;
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.completed ? "Complete" : taskTimeLeft}</td>
        `;

        row.style.backgroundColor = task.completed === "on" ? "lightgreen" : (taskTimeLeft === "Past due" && task.completed !== "on" ? "red" : "white");

        table.appendChild(row);
        rowsMade ++;
    }
    if (tasks.length === 0) {
        table.innerHTML += `
        <tr>
            <td colspan='3'>No tasks for this date.</td>
        </tr>
        <tr>
        `;
    }
    table.innerHTML += `
        <tr>
            <td id="button-container">
                <input type="button" id="view-all-tasks-btn" class="rounded border border-1 border-dark" onclick="location.href='/calendar'" value="View All Tasks">
            </td>
        </tr>
    `;
}

loadTasks();