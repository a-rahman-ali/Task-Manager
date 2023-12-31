// task.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../app/models/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private apiUrl = 'http://localhost:3000/tasks';
  private apiUrl = '/api/tasks';
  taskUpdated: EventEmitter<ITask> = new EventEmitter<ITask>();


  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  updateTask(taskId: number, updatedTask: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.put<ITask>(url, updatedTask);
  }
  
  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
  getTasksByUserId(userId: number): Observable<ITask[]> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<ITask[]>(url);
  }
  getTaskById(taskId: number): Observable<ITask> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<ITask>(url);
  }
}
