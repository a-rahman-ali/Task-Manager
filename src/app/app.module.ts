import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';
import { EditTasksComponent } from './components/list-tasks/edit-tasks/edit-tasks.component';
import { CategorizeTasksComponent } from './components/categorize-tasks/categorize-tasks.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ListTasksComponent,
    AddTasksComponent,
    EditTasksComponent,
    CategorizeTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
