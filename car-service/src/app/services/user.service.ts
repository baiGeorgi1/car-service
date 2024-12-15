import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, tap, timeout } from "rxjs";
import { User, UserAuth } from "../types/user";
import { environment } from "src/environments/environment.development";

const { userUrl, USER_KEY } = environment;

@Injectable({
    providedIn: "root",
})
export class UserService implements OnDestroy {
    private user$$ = new BehaviorSubject<UserAuth | undefined>(undefined);
    public user$ = this.user$$.asObservable();

    user: UserAuth | undefined;
    userSubscription: Subscription;

    get isLogged(): boolean {
        const token = localStorage.getItem(USER_KEY);
        if (token) {
            return true;
        }
        return false;
    }

    constructor(private http: HttpClient) {
        this.userSubscription = this.user$.subscribe((user) => {
            this.user = user;
        });
    }

    login(email: string, password: string) {
        return this.http
            .post<UserAuth>(`${userUrl}/login`, {
                email,
                password,
            })
            .pipe(
                tap((user) => {
                    this.user$$.next(user);
                }),
            );
    }
    // !! TESTING
    register(UserData: {
        username: string;
        email: string;
        password: string;
        rePassword: string;
    }) {
        return this.http
            .post<UserAuth>(`${userUrl}/register`, UserData)
            .pipe(tap((user) => this.user$$.next(user)));
    }

    setUser(data: any): void {
        localStorage.setItem(environment.USER_KEY, JSON.stringify(data));
    }

    logout() {
        return this.http
            .post(`${userUrl}/logout`, {})
            .pipe(tap((user) => this.user$$.next(undefined)));
    }
    clearUser(): void {
        localStorage.removeItem(USER_KEY);
    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
