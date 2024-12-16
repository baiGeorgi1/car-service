import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service-page/service.component";
import { HomeComponent } from "./home/home.component";
import { ViewCarComponent } from "./view-car/view-car.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { MyCarsComponent } from "./my-cars/my-cars.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "service", component: ServiceComponent },
    { path: "new-cars", component: ViewCarComponent },
    { path: "catalog", component: CatalogComponent },
    { path: "catalog/my-cars", component: MyCarsComponent },
    { path: "catalog/:car-details", component: ViewCarComponent },
    { path: "contacts", component: ContactsComponent },
    // { path: '404', component: ErrorComponent },
    // { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
