import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { UserModule } from "./user/user.module";
import { PagesModule } from "./pages/pages.module";
import { HttpClientModule } from "@angular/common/http";
import { TruncatePipe } from "./pipes/truncate.pipe";
import { AppInterceptorProvider } from "./app.interceptor";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        UserModule,
        PagesModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
    ],
    providers: [AppInterceptorProvider],
    bootstrap: [AppComponent],
})
export class AppModule {}
