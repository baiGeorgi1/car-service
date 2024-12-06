import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
    // { path: "/", pathMatch: "full", redirectTo: "/" },
    { path: "404", component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
