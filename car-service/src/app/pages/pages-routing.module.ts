import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service/service.component";
import { MainComponent } from "./main/main.component";
import { NewestCarsComponent } from "./newest-cars/newest-cars.component";
import { FeaturedCarsComponent } from "./featured-cars/featured-cars.component";

const routes: Routes = [
    { path: "", component: MainComponent },
    { path: "service", component: ServiceComponent },
    { path: "new-cars", component: NewestCarsComponent },
    { path: "featured-cars", component: FeaturedCarsComponent },
    // { path: "newest-cars", component: ServiceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
