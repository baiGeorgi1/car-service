import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, CoreModule, UserRoutingModule, RouterModule],
})
export class UserModule {}
