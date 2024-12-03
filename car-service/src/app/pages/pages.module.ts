import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { NewestCarsComponent } from './newest-cars/newest-cars.component';
import { FeaturedCarsComponent } from './featured-cars/featured-cars.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CoreModule } from '../core/core.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [
    HomeComponent,
    ServiceComponent,
    NewestCarsComponent,
    FeaturedCarsComponent,
    ContactsComponent,
    ErrorComponent,
  ],
  imports: [CommonModule, CoreModule, PagesRoutingModule],
})
export class PagesModule {}
