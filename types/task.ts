// Task type'ını tanımla
import { User } from "./user"

export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee: User[];
}