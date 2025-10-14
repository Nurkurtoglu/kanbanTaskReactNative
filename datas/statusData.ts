import { avatars } from '../types/avatarMap';



export const backlogTasks = [
    {
        id: '1', title: 'Implement Clean Architecture', description: 'Refactor the app',
        assignee: [
            { id: '1', name: 'Alice', avatar: avatars.user1 },
            { id: '2', name: 'Bob', avatar: avatars.user2 }
        ]
    },
    {
        id: '2', title: 'Add TypeScript', description: 'Migrate to TypeScript',
        assignee: [
            { id: '3', name: 'Alice', avatar: avatars.user3 },

        ]
    },
    {
        id: '3', title: 'Implement Clean Architecture', description: 'Refactor the app',
        assignee: [
            { id: '5', name: 'Alice', avatar: avatars.woman1 },

        ]
    },
    {
        id: '4', title: 'Add TypeScript', description: 'Migrate to TypeScript',
        assignee: [
            { id: '7', name: 'Alice', avatar: avatars.woman2 },

        ]
    },
    {
        id: '5', title: 'Implement Clean Architecture', description: 'Refactor the app',
        assignee: [
            { id: '9', name: 'Alice', avatar: avatars.user1 },

        ]
    },
    {
        id: '6', title: 'Add TypeScript', description: 'Migrate to TypeScript',
        assignee: [
            { id: '11', name: 'Alice', avatar: avatars.user3 },

        ]
    },
];

export const inProgressTasks = [
    {
        id: '1', title: 'Design System', description: 'Create component library',
        assignee: [
            { id: '13', name: 'Alice', avatar: avatars.user1 },
            { id: '14', name: 'Bob', avatar: avatars.woman1 }
        ]
    },
    {
        id: '2', title: 'Design System', description: 'Create component library',
        assignee: [
            { id: '15', name: 'Alice', avatar: avatars.user3 },

        ]
    },
    {
        id: '3', title: 'Design System', description: 'Create component library',
        assignee: [
            { id: '17', name: 'Alice', avatar: avatars.user2 },

        ]
    },
    {
        id: '4', title: 'Design System', description: 'Create component library',
        assignee: [
            { id: '20', name: 'Alice', avatar: avatars.user2 },

        ]
    },
    {
        id: '5', title: 'Design System', description: 'Create component library',
        assignee: [
            { id: '22', name: 'Alice', avatar: avatars.woman2 },
        ]
    },
];
export const todoTasks = [
    {
        id: '4', title: 'Create component ', description: 'Create component sdadasdsalibrary',
        assignee: [
            { id: '23', name: 'Alice', avatar: avatars.woman2 },

        ]
    },
    {
        id: '5', title: 'Create component ', description: 'Create component sdadasdsalibrary',
        assignee: [
            { id: '24', name: 'Alice', avatar: avatars.user3 },

        ]
    },
    {
        id: '6', title: 'Create component ', description: 'Create component sdadasdsalibrary',
        assignee: [
            { id: '25', name: 'Alice', avatar: avatars.woman2 },

        ]
    },
];