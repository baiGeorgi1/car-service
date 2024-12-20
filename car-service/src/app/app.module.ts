import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { UserModule } from "./user/user.module";
import { PagesModule } from "./pages/pages.module";
import { HttpClientModule } from "@angular/common/http";
import { AppInterceptorProvider } from "./app.interceptor";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        UserModule,
        PagesModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [AppInterceptorProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
