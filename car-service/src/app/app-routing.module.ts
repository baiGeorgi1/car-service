import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ErrorPageComponent } from "./pages/error-page/error-page.component";
import { ErrorComponent } from "./core/error/error.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    {
        path: "users",
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
    },
    { path: "error", component: ErrorComponent },
    { path: "404", component: ErrorPageComponent },
    { path: "**", pathMatch: "full", redirectTo: "/404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
