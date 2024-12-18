import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { IsGuestActivated } from "../guards/isGuest.activate";

const routes: Routes = [
    {
        path: "users/login",
        canActivate: [IsGuestActivated],
        component: LoginComponent,
    },
    {
        path: "users/register",
        canActivate: [IsGuestActivated],
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
