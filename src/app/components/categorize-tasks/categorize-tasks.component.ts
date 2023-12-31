// categorize-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from 'src/app/models/ITask';
import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-categorize-tasks',
//   templateUrl: './categorize-tasks.component.html',
//   styleUrls: ['./categorize-tasks.component.css']
// })
// export class CategorizeTasksComponent implements OnInit {
//   tasks: ITask[] = []; 
//   filteredTasks: ITask[] = [];
//   sortDirection: 'asc' | 'desc' = 'asc';

//   constructor(private authService: AuthService, private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.fetchTasks();
//   }

//   fetchTasks(): void {
//     const currentUser = this.authService.getCurrentUser();

//     if (currentUser) {
//       this.taskService.getTasksByUserId(currentUser.id).subscribe((tasks) => {
//         this.tasks = tasks;
//         this.filteredTasks = tasks;
//       });
//     }
//   }

//   filterTasksByCategory(event: any): void {
//     // Filter tasks by category
//     const category = event.target.value; // Access value from event.target
//     if (category === '') {
//       this.filteredTasks = this.tasks; // If category is empty, show all tasks
//     } else {
//       this.filteredTasks = this.tasks.filter(task => task.category === category);
//     }
//   }

//   sortTasksByDate(direction: 'asc' | 'desc'): void {
//     this.sortDirection = direction;

//     // Sort tasks by date
//     this.filteredTasks.sort((a, b) => {
//       const dateA = new Date(a.dueDate).getTime();
//       const dateB = new Date(b.dueDate).getTime();

//       if (direction === 'asc') {
//         return dateA - dateB;
//       } else {
//         return dateB - dateA;
//       }
//     });
//   }

//   filterTasksByCompletionStatus(event: any): void {
//     const isCompleted = event?.target.value;
  
//     if (isCompleted === '') {
//       this.filteredTasks = this.tasks;
//     } else {
//       // Convert the completion status to boolean for comparison
//       const completionStatus = isCompleted === 'true';
//       this.filteredTasks = this.tasks.filter(task => task.completionStatus === completionStatus);
//     }
//   }
// }

// categorize-tasks.component.ts

@Component({
  selector: 'app-categorize-tasks',
  templateUrl: './categorize-tasks.component.html',
  styleUrls: ['./categorize-tasks.component.css']
})
export class CategorizeTasksComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private authService: AuthService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.taskService.getTasksByUserId(currentUser.id).subscribe((tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
      });
    }
  }

  filterTasks(): void {
    // Apply all filters
    this.filteredTasks = this.tasks.filter(task => 
      this.filterByCategory(task) &&
      this.filterByCompletionStatus(task)
      // Add more filter conditions as needed
    );
  }

  filterByCategory(task: ITask): boolean {
    // Filter by category
    const selectedCategory = this.selectedCategory;
    return selectedCategory === '' || task.category === selectedCategory;
  }

  sortTasksByDate(direction: 'asc' | 'desc'): void {
    this.sortDirection = direction;

    // Sort tasks by date
    this.filteredTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (direction === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

  filterByCompletionStatus(task: ITask): boolean {
    // Filter by completion status
    const selectedCompletionStatus = this.selectedCompletionStatus;
    return selectedCompletionStatus === '' || task.completionStatus === (selectedCompletionStatus === 'true');
  }

  // ... (add more filtering functions as needed)

  // Properties to hold selected values
  private selectedCategory: string = '';
  private selectedCompletionStatus: string = '';

  // Update selected category
  filterTasksByCategory(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterTasks();
  }

  // Update selected completion status
  filterTasksByCompletionStatus(event: any): void {
    this.selectedCompletionStatus = event.target.value;
    this.filterTasks();
  }
}
