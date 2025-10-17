// Task type'ını tanımla
import { User } from "./user"

export interface Task {
    id: string
    status: string
    title: string
    description: string
    assignee: User[]
}