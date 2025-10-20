import knex from "../db.js";
import { v4 as uuidv4 } from "uuid";


const TBL_NAME = process.env.DB_TBL_NAME2



// Tüm görevleri listeleme (görev atanmış kullanıcılar dahil)
export async function getAllTasks() {
    const tasks = await knex(TBL_NAME).select('*');

    // Her görev için atanan kullanıcıları al
    for (let task of tasks) {
        const assignees = await knex('task_assignees')
            .join('users', 'task_assignees.user_id', 'users.id')
            .where('task_assignees.task_id', task.id)
            .select('users.id', 'users.name', 'users.surname', 'users.avatarIndex');

        task.assignees = assignees;
    }

    return tasks;
}

// Tek görev getirme
export async function getTaskById(id) {
    const task = await knex(TBL_NAME).where({ id }).first();
    if (!task) return null;

    const assignees = await knex('task_assignees')
        .join('users', 'task_assignees.user_id', 'users.id')
        .where('task_assignees.task_id', id)
        .select('users.id', 'users.name', 'users.surname', 'users.avatarIndex');

    task.assignees = assignees;
    return task;
}


// Görev ekleme
export async function addTask(task, createdById, assignees = []) {
    const newTask = {
        id: uuidv4(),
        title: task.title,
        description: task.description,
        status: task.status,
        created_by: createdById,
        created_at: new Date(),
        updated_at: new Date(),
    };

    // Task'i ekle
    const insertedTasks = await knex(TBL_NAME)
        .insert(newTask)
        .returning('*');

    const addedTask = insertedTasks[0];

    // Assignees ekle
    for (let userId of assignees) {
        await knex('task_assignees').insert({ task_id: addedTask.id, user_id: userId });
    }

    // Created_by user bilgisi
    const createdByUser = await knex("users")
        .where({ id: createdById })
        .first()
        .select("id", "name", "surname", "avatarIndex");

    addedTask.created_by_user = createdByUser;

    // Atanan kullanıcılar
    const assignedUsers = await knex("task_assignees")
        .join("users", "task_assignees.user_id", "users.id")
        .where("task_assignees.task_id", addedTask.id)
        .select("users.id", "users.name", "users.surname", "users.avatarIndex");

    addedTask.assignees = assignedUsers;

    return addedTask;
}


// Görev güncelleme
export async function updateTask(id, updatedFields) {
    return await knex(TBL_NAME)
        .where({ id })
        .update({ ...updatedFields, updated_at: knex.fn.now() })
        .returning('*');
}

// Görev silme
export async function deleteTask(id) {
    return await knex(TBL_NAME).where({ id }).del();
}
