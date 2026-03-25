import { addTask, editTask } from "../models/task.js";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { getTasksByDate, getTasksByUser } from "../models/task.js";
import { setFlash, getFlash } from "../tools/flash.js"

export async function addTaskController(request) {
    const   formData = await request.formData(),
            title = formData.get("taskName"),
            startDate = formData.get("taskStartDate"),
            endDate = formData.get("taskEndDate"),
            userId = getCookies(request.headers).session,
            start = new Date (startDate),
            end = new Date (endDate),
            headers = new Headers();

    // Input validation
    if (!title || !startDate || !endDate) {
        setFlash(headers, "All fields are required");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "All fields required", status: 410});
    }

    if (start > end) {
        setFlash(headers, "Start date is after end date");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "Start date is after end date", status: 411});
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setFlash(headers, "Invalid date format");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "Invalid date format", status: 412});
    }


    try {
        await addTask({ title, startDate, endDate, userId });
        return new Response(null, {
            status: 303,
            headers: { Location: "/calendar" },
        });
    } catch (err) {
        console.log("add controller error:", err.message);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}

export async function editTaskController(request) {
    const   formData = await request.formData(),
            title = formData.get("taskName"),
            startDate = formData.get("taskStartDate"),
            endDate = formData.get("taskEndDate"),
            completed = formData.get("taskCompleted"),
            taskId = formData.get("taskId"),
            start = new Date (startDate),
            end = new Date (endDate),
            headers = new Headers();

    // Input validation
    if (!title || !startDate || !endDate) {
        setFlash(headers, "All fields are required");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "All fields required", status: 410});
    }

    if (start > end) {
        setFlash(headers, "Start date is after end date");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "Start date is after end date", status: 411});
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setFlash(headers, "Invalid date format");
        headers.set("Location", "/calendar");
        return new Response(null, {ok: false, statusText: "Invalid date format", status: 412});
    }

    try {
        await editTask({ title, startDate, endDate, completed, taskId });
        return new Response(null, {
            status: 303,
            headers: { Location: "/calendar" },
        });
    } catch (err) {
        console.log("edit controller error:", err.message);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            headers: {
                "Content-Type": "application/json",
                "Location": "/calendar"
            },
            status: 500,
        });
    }
}

export async function getTasksByDateController(request) {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    const userId = getCookies(request.headers).session;

    try {
        const tasks = getTasksByDate(userId, date);

        return new Response(JSON.stringify(Array.isArray(tasks) ? tasks : []), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}

export async function getTasksByUserController(request) {
    const userId = getCookies(request.headers).session;

    try {
        const tasks = await getTasksByUser(userId);

        return new Response(JSON.stringify(tasks), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}