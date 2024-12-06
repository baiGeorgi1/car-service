import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home/home.component";
import { ServiceComponent } from "./service-page/service.component";
import { NewestCarsComponent } from "./newest-cars/newest-cars.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CoreModule } from "../core/core.module";
import { ContactsComponent } from "./contacts/contacts.component";
import { ErrorComponent } from "../error/error.component";
import { CarModule } from "../car/car.module";

@NgModule({
    declarations: [
        HomeComponent,
        ServiceComponent,
        NewestCarsComponent,
        CatalogComponent,
        ContactsComponent,
        ErrorComponent,
    ],
    imports: [CommonModule, CoreModule, CarModule, PagesRoutingModule],
})
export class PagesModule {}
