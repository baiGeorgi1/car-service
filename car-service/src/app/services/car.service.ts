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
        return this.http.get<Car[]>(`${carApi}/catalog`).pipe(
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
    editCar(data: Car, carId: string): Observable<Car> {
        return this.http.put<Car>(`${carApi}/edit/${carId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    deleteCar(carId: string): Observable<Car> {
        return this.http.get<Car>(`${carApi}/delete/${carId}`);
    }
}
