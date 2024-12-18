import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

import { environment } from "src/environments/environment.development";
const { USER_KEY } = environment;

@Injectable({ providedIn: "root" })
export class IsGuestActivated implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const token = localStorage.getItem(USER_KEY);
        if (token) {
            return this.router.createUrlTree(["/"]);
        }
        return true;
    }
}
