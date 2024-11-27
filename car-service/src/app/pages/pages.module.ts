import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainComponent } from "./main/main.component";
import { ServiceComponent } from "./service/service.component";
import { NewestCarsComponent } from "./newest-cars/newest-cars.component";
import { FeaturedCarsComponent } from "./featured-cars/featured-cars.component";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
    declarations: [
        MainComponent,
        ServiceComponent,
        NewestCarsComponent,
        FeaturedCarsComponent,
    ],
    imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
