import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ErrorService {
    private apiErr$$ = new BehaviorSubject(null);
    //  за да можем да го достъпим от други места
    public apiError$ = this.apiErr$$.asObservable();
    private error: any;

    constructor() {}

    setError(error: any): void {
        this.error = error;
        this.apiErr$$.next(error);
    }
    getError(): any {
        const temp = this.error;
        this.error = null;
        return temp;
    }
}
