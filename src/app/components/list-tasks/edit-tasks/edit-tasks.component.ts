import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../../src/app/services/task.service';
import { ITask } from '../../../../../src/app/models/ITask';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent implements OnInit {
  @Input() preloadedData: ITask | null = null;

  task: ITask = {
    id: 0,
    task_name: '',
    completionStatus: false,
    category: '',
    dueDate: '',
    userId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    if (this.preloadedData) {
      this.task = { ...this.preloadedData };
    } else {
      this.route.params.subscribe(params => {
        const taskId = +params['id'];
        if (taskId) {
          this.taskService.getTaskById(taskId).subscribe(task => {
            this.task = { ...task };
          });
        }
      });
    }
    console.log(this.task.task_name);
    
  }
  updateTask(): void {

    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.taskService.taskUpdated.emit(this.task);
      this.router.navigate(['/list-tasks']);
    });
  }
}
