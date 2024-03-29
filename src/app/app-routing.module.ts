import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from "./system/views/system/system.component";
import { LoginComponent } from "./system/views/login/login.component";
import { AuthenticatedGuard } from "./system/guards/authenticated.guard";
import { UnauthenticatedGuard } from "./system/guards/unauthenticated.guard";
import { PanicComponent } from "./system/views/panic/panic.component";

const routes: Routes = [
    { path: '', component: SystemComponent, canActivate: [AuthenticatedGuard] },
    { path: 'login', component: LoginComponent, canActivate: [UnauthenticatedGuard] },
    { path: 'panic', component: PanicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
