import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { catchError, Observable } from "rxjs";

import { environment } from "../environments/environment.development";
import { ErrorService } from "./core/error/error.service";
import { Router } from "@angular/router";

const { userUrl } = environment;

@Injectable()
class AppInterceptor implements HttpInterceptor {
    API = "/users";

    constructor(private errorService: ErrorService, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // console.log(req);

        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, userUrl),
                withCredentials: true,
            });
        }
        // следим за грешки с pipe(catchError)
        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.router.navigate(["/users/login"]);
                } else if (err.status === 400) {
                    this.errorService.setError(err);
                    this.router.navigate(["/users/login"]);
                } else {
                    this.errorService.setError(err);
                    this.router.navigate(["/error"]);
                }
                throw err;
            }),
        );
    }
}
export const AppInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
};
