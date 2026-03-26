export function viewHome(user) {
    return `
        <link rel="stylesheet" src="/public/styles/addTask.css">
        <main class="d-flex">
            <div id="side-l" class="divider">
                <div id="user-details" class="container-fluid d-flex">
                    <img id="profile-picture" class="rounded-circle" src="/assets/profile-placeholder.jpg" alt="User's profile picture">
                    <p id="username" class="rounded">${user?.username || "Guest"}</p>
                    <div class=" d-flex rounded-circle h-100 border border-primary">
                        <p id="user-level">XP Level</p>
                    </div>
                </div>
                <section class="task-table">
                    <table id="task-table"></table>
                </section>
            </div>
            <div id="side-r" class="divider">
                <p class="recently-collected-title">Recent Items</p>
                <div id="recently-collected" class="d-flex">
                    <div class="recent-item">
                        <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                    </div>
                    <div class="recent-item">
                        <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                    </div>
                    <div class="recent-item">
                        <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
                    </div>
                    <div class="recent-item">
                        <img src="/assets/collectible-placeholder.jpg" alt="Recent collectible">
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
        </main>
    `
}