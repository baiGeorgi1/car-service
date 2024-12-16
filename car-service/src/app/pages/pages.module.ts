import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home/home.component";
import { ServiceComponent } from "./service-page/service.component";
import { ViewCarComponent } from "./view-car/view-car.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CoreModule } from "../core/core.module";
import { ContactsComponent } from "./contacts/contacts.component";
import { ErrorComponent } from "../error/error.component";
import { CarModule } from "../car/car.module";

import { MyCarsComponent } from "./my-cars/my-cars.component";
import { AddEditCarComponent } from "./add-edit-car/add-edit-car.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HomeComponent,
        ServiceComponent,
        ViewCarComponent,
        CatalogComponent,
        ContactsComponent,
        ErrorComponent,
        MyCarsComponent,
        AddEditCarComponent,
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        CarModule,
        PagesRoutingModule,
    ],
})
export class PagesModule {}
