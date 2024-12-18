import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    {
        path: "users",
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
    },
    { path: "404", component: ErrorComponent },
    { path: "**", pathMatch: "full", redirectTo: "/404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
