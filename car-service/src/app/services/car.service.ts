import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { catchError, Observable, throwError } from "rxjs";
import { Car } from "../types/car";

const { carApi } = environment;
@Injectable({
    providedIn: "root",
})
export class CarService {
    constructor(private http: HttpClient) {}

    getCars(): Observable<Car[]> {
        const api = environment.carApi;

        return this.http.get<Car[]>(`${api}/catalog`).pipe(
            catchError((err) => {
                console.error("Error fetching cars:", err);
                return throwError(() => new Error("Failed to fetch cars"));
            }),
        );
    }
    getCar(id: string, userId: string) {
        return this.http.get<Car>(`${carApi}/catalog/${id}`, {
            params: { userId: userId },
        });
    }

    addCar(data: Car): Observable<Car> {
        return this.http.post<Car>(`${carApi}/catalog/add-car`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
