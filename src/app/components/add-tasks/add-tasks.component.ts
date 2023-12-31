import { Component } from '@angular/core';
import { TaskService } from '../../../../src/app/services/task.service';
import { AuthService } from '../../../../src/app/services/auth.service';
import { Router } from '@angular/router';
import { ITask } from '../../../../src/app/models/ITask';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent {
  newTask: ITask = {
    id: 0,
    task_name: '',
    completionStatus: false,
    category: '',
    dueDate: '',
    userId: this.authService.getCurrentUser().id
  };

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  updateTaskTitle(event: Event): void {
    this.newTask.task_name = (event.target as HTMLInputElement).value;
  }

  updateTaskCategory(event: Event): void {
    this.newTask.category = (event.target as HTMLSelectElement).value;
  }

  updateTaskDueDate(event: Event): void {
    this.newTask.dueDate = (event.target as HTMLInputElement).value;
  }

  updateTaskCompletionStatus(completed: boolean): void {
    this.newTask.completionStatus = completed;
  }

  addTask(): void {
    if (this.isValidTask() ) {
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.router.navigate(['/list-tasks']);
      });
    } else {
      // this.detailsRequired = true;
      alert('Please fill in all required fields.');
    }
  }

  validTaskName() : boolean {
    return this.newTask.task_name.trim() !== '';
  
  }
  validTaskCategory(): boolean {
    return this.newTask.category.trim() !== '';
  }
  validDueDate():boolean{
    return this.newTask.dueDate !== ''
  }
  isValidTask(): boolean {
    return this.validTaskName() && this.validTaskCategory() && this.validDueDate();
  }
}
