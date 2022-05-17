import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

import {MatIconModule} from '@angular/material/icon';

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/services/auth.guard";
import {SearchPipe} from './shared/search.pipe';
import {AlertComponent} from './shared/alert/alert.component';



const routes:Routes=[
  {path: '', component: AdminLayoutComponent,children:[
      {path: '', redirectTo:'/admin/login',pathMatch:'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent,canActivate:[AuthGuard]},
      {path: 'create', component: CreatePageComponent,canActivate:[AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent,canActivate:[AuthGuard]},
    ]},
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    SearchPipe,
    EditPageComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule
  ],
  exports: [
    RouterModule,
  ],
  providers:[
    AuthGuard
  ]
})

export class AdminModule { }
