import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/ITask';
import { TaskService } from '../../../../src/app/services/task.service';
import { AuthService } from '../../../../src/app/services/auth.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.taskService.taskUpdated.subscribe(updatedTask => {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }

  loadTasks(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.taskService.getTasksByUserId(currentUser.id).subscribe((tasks) => {
        this.tasks = tasks;
      });
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  openEditForm(taskId: number): void {
    this.router.navigate(['/list-tasks/edit-tasks', taskId]);
  }
}
