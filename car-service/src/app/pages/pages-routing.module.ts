import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service-page/service.component";
import { HomeComponent } from "./home/home.component";
import { NewestCarsComponent } from "./newest-cars/newest-cars.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { ContactsComponent } from "./contacts/contacts.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "service", component: ServiceComponent },
    { path: "new-cars", component: NewestCarsComponent },
    { path: "catalog", component: CatalogComponent },
    { path: "contacts", component: ContactsComponent },
    // { path: '404', component: ErrorComponent },
    // { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
