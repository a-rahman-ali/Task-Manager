import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';
import { EditTasksComponent } from './components/list-tasks/edit-tasks/edit-tasks.component';
import { CategorizeTasksComponent } from './components/categorize-tasks/categorize-tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'add-tasks', component: AddTasksComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'list-tasks', 
    component: ListTasksComponent ,
    canActivate: [AuthGuard],
    children : [{ path: 'edit-tasks/:id', component: EditTasksComponent},]
  },
  { path: 'tasks-category', component: CategorizeTasksComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
