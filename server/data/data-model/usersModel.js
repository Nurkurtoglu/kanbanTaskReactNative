import knex from "../db.js";
import { v4 as uuidv4 } from "uuid";


const TBL_NAME = process.env.DB_TBL_NAME1;
console.log(TBL_NAME)


// 1. Listeleme
export async function getAllUsers() {
    return await knex(TBL_NAME).select('*');
}

// 2. Tek kullanıcıyı ID ile getirme
export async function getUserById(id) {
    return await knex(TBL_NAME).where({ id }).first();
}


// meail kullanarak giriş 
export async function getUserByEmail(email) {
    return await knex(TBL_NAME).where({ email }).first();
}


// 3. Ekleme
export async function addUser(user) {
    const newUser = {
        id: uuidv4(),
        ...user
    };
    return await knex(TBL_NAME).insert(newUser).returning('*');
}

// 4. Güncelleme
export async function updateUser(id, updatedFields) {
    return await knex(TBL_NAME)
        .where({ id })
        .update({ ...updatedFields, updated_at: knex.fn.now() })
        .returning('*');
}

// 5. Silme
export async function deleteUser(id) {
    return await knex(TBL_NAME).where({ id }).del();
}
