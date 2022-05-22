import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from "./system/views/system/system.component";
import { LoginComponent } from "./system/views/login/login.component";

const routes: Routes = [
    { path: '', component: SystemComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
