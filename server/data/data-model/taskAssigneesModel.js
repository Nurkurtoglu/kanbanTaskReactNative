import knex from "../db.js";

const TBL_NAME = process.env.DB_TBL_NAME3

// Göreve kullanıcı ekleme
export async function addAssignee(task_id, user_id) {
    return await knex(TBL_NAME).insert({ task_id, user_id }).returning('*');
}

// Görevden kullanıcı çıkarma
export async function removeAssignee(task_id, user_id) {
    return await knex(TBL_NAME).where({ task_id, user_id }).del();
}

// Belirli görev için tüm atamaları sil
export async function removeAllAssignees(task_id) {
    return await knex(TBL_NAME).where({ task_id }).del();
}


// Belirli görev için tüm atanan kullanıcılar
export async function getAssigneesByTask(task_id) {
    return await knex(TBL_NAME)
        .join('users', 'task_assignees.user_id', 'users.id')
        .where('task_assignees.task_id', task_id)
        .select('users.id', 'users.name', 'users.surname', 'users.avatarIndex');
}
