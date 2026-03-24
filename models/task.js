import { db } from '../tools/db.js';

export async function addTask({ title, startDate, endDate, userId }) {
  return db.prepare(
    "INSERT INTO tasks (title, start_date, end_date, user_id) VALUES (:title, :startDate, :endDate, :userId)",
  ).run({title, startDate, endDate, userId});
}

export async function getAllTasks(username) {
  return db.query(
    "SELECT * FROM tasks WHERE user_id = (SELECT id FROM users WHERE username = :username)",
    { username }
  );
}

export function getTasksByDate(userId, date) {
  return db.prepare(`
    SELECT * FROM tasks
    WHERE user_id = :userId
    AND start_date <= :date
    AND end_date >= :date
  `).all({ userId, date }) || [];
}