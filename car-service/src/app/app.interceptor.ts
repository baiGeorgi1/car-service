import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../environments/environment.development";

const { userUrl } = environment;

@Injectable()

// todo add export if needed
class AppInterceptor implements HttpInterceptor {
    API = "/users";

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, userUrl),
                withCredentials: true,
            });
        }

        return next.handle(req);
    }
}
export const AppInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
};
