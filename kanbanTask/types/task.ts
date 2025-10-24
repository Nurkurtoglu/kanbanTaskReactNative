// Task type'ını tanımla
import { User } from "./user"

export interface Task {
    id: string
    status: string
    title: string
    description: string
    assignees: User[]
    created_at: string;
    updated_at: string;
    created_by?: string;
}