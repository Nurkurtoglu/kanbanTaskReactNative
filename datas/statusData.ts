import { avatars } from '../types/avatarMap';
import { Task } from "../types/task"



export const allTasks: Task[] = [
    // backlog
    {
        id: '1',
        title: 'Implement Clean Architecture',
        description: 'Refactor the app',
        status: 'backlog',
        assignee: [
            { id: '1', name: 'Alice', avatar: avatars[0] },
            { id: '2', name: 'Bob', avatar: avatars[1] },
        ],
    },
    {
        id: '2',
        title: 'Add TypeScript',
        description: 'Migrate to TypeScript',
        status: 'backlog',
        assignee: [{ id: '3', name: 'Alice', avatar: avatars[0] }],
    },
    {
        id: '3',
        title: 'Implement Clean Architecture',
        description: 'Refactor the app',
        status: 'backlog',
        assignee: [{ id: '5', name: 'Alice', avatar: avatars[4] }],
    },
    {
        id: '4',
        title: 'Add TypeScript',
        description: 'Migrate to TypeScript',
        status: 'backlog',
        assignee: [{ id: '7', name: 'Alice', avatar: avatars[5] }],
    },
    {
        id: '5',
        title: 'Implement Clean Architecture',
        description: 'Refactor the app',
        status: 'backlog',
        assignee: [{ id: '9', name: 'Alice', avatar: avatars[0] }],
    },
    {
        id: '6',
        title: 'Add TypeScript',
        description: 'Migrate to TypeScript',
        status: 'backlog',
        assignee: [{ id: '11', name: 'Alice', avatar: avatars[2] }],
    },

    // inProgress
    {
        id: '7',
        title: 'Design System',
        description: 'Create component library',
        status: 'inProgress',
        assignee: [
            { id: '13', name: 'Alice', avatar: avatars[0] },
            { id: '14', name: 'Bob', avatar: avatars[4] },
        ],
    },
    {
        id: '8',
        title: 'Design System',
        description: 'Create component library',
        status: 'inProgress',
        assignee: [{ id: '15', name: 'Alice', avatar: avatars[2] }],
    },
    {
        id: '9',
        title: 'Design System',
        description: 'Create component library',
        status: 'inProgress',
        assignee: [{ id: '17', name: 'Alice', avatar: avatars[1] }],
    },
    {
        id: '10',
        title: 'Design System',
        description: 'Create component library',
        status: 'inProgress',
        assignee: [{ id: '20', name: 'Alice', avatar: avatars[1] }],
    },
    {
        id: '11',
        title: 'Design System',
        description: 'Create component library',
        status: 'inProgress',
        assignee: [{ id: '22', name: 'Alice', avatar: avatars[5] }],
    },

    // todo
    {
        id: '12',
        title: 'Create component',
        description: 'Create component sdadasdsalibrary',
        status: 'todo',
        assignee: [{ id: '23', name: 'Alice', avatar: avatars[5] }],
    },
    {
        id: '13',
        title: 'Create component',
        description: 'Create component sdadasdsalibrary',
        status: 'todo',
        assignee: [{ id: '24', name: 'Alice', avatar: avatars[2] }],
    },
    {
        id: '14',
        title: 'Create component',
        description: 'Create component sdadasdsalibrary',
        status: 'todo',
        assignee: [{ id: '25', name: 'Alice', avatar: avatars[5] }],
    },
];


// şimdi sen artık avatar bilgilerini şu lekilde tut ve artık bak sign up kısmında kaydolacak mı ve kanbanrowlarda görünecek mi export const avatars = [
//     "/assets/images/man.png",
//     "/assets/images/man2.png",
//     "/assets/images/man3.png",
// ];

