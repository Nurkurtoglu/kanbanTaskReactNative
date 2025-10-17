/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { v4 as uuidv4 } from 'uuid';


export const user1Id = uuidv4();
export const user2Id = uuidv4();
export const user3Id = uuidv4();

export const task1Id = uuidv4();
export const task2Id = uuidv4();
export const task3Id = uuidv4();


export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('users').del();
  await knex('users').insert([
    {
      id: user1Id,
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice@mail.com',
      password: '$2b$10$examplehashedpassword', // bcrypt ile hashlenmiş şifre örneği
      avatarIndex: 2
    },
    {
      id: user2Id,
      name: 'Bob',
      surname: 'Smith',
      email: 'bob@mail.com',
      password: '$2b$10$examplehashedpassword',
      avatarIndex: 1
    },
    {
      id: user3Id,
      name: 'Charlie',
      surname: 'Brown',
      email: 'charlie@mail.com',
      password: '$2b$10$examplehashedpassword',
      avatarIndex: 0
    }
  ]);

  await knex('tasks').del();
  await knex('tasks').insert([
    { id: task1Id, title: 'Create component', description: 'Task description', status: 'todo', created_by: user1Id },
    { id: task2Id, title: 'Design DB schema', description: 'Task description', status: 'inprogress', created_by: user2Id },
    { id: task3Id, title: 'Write API endpoints', description: 'Task description', status: 'backlog', created_by: user1Id }
  ]);

  // 3️⃣ task_assignees
  await knex('task_assignees').del();
  await knex('task_assignees').insert([
    { task_id: task1Id, user_id: user2Id },
    { task_id: task1Id, user_id: user3Id },
    { task_id: task2Id, user_id: user1Id },
    { task_id: task3Id, user_id: user2Id }
  ]);

};
