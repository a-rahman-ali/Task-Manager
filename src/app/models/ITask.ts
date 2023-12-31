export interface ITask {
    id: number;
    task_name: string;
    completionStatus: boolean;
    category: string;
    dueDate: string;
    userId: number;
}