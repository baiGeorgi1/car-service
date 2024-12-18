import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceComponent } from "./service-page/service.component";
import { HomeComponent } from "./home/home.component";
import { ViewCarComponent } from "./view-car/view-car.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { MyCarsComponent } from "./my-cars/my-cars.component";
import { AddEditCarComponent } from "./add-edit-car/add-edit-car.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { IsUserActivated } from "../guards/isUser.activate";
import { IsGuestActivated } from "../guards/isGuest.activate";

const routes: Routes = [
    {
        path: "catalog",
        canActivate: [IsUserActivated],
        component: CatalogComponent,
    },
    {
        path: "catalog/my-cars",
        canActivate: [IsUserActivated],
        component: MyCarsComponent,
    },
    {
        path: "catalog/my-cars/add-car",
        canActivate: [IsUserActivated],
        component: AddEditCarComponent,
    },
    {
        path: "catalog/my-cars/edit-car/:carId",
        canActivate: [IsUserActivated],
        component: AddEditCarComponent,
    },
    {
        path: "catalog/:carId",
        canActivate: [IsUserActivated],
        component: ViewCarComponent,
    },
    {
        path: "service",
        canActivate: [IsGuestActivated],
        component: ServiceComponent,
    },
    { path: "contacts", component: ContactsComponent },
    // { path: "new-cars", component: ViewCarComponent },
    { path: "404", component: ErrorPageComponent },
    { path: "catalog/**", redirectTo: "/404", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
