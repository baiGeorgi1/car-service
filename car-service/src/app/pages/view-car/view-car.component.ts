import { Component, DoCheck, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { CarService } from "src/app/services/car.service";
import { UserService } from "src/app/services/user.service";
import { Car } from "src/app/types/car";
import { User } from "src/app/types/user";

@Component({
    selector: "app-newest-cars",
    templateUrl: "./view-car.component.html",
    styleUrls: ["./view-car.component.css"],
})
export class ViewCarComponent implements OnInit, OnDestroy {
    subscribe$!: Subscription;
    ownerSubs$!: Subscription;

    isOwner!: boolean;
    deleteMode: boolean = false;

    errorMsg!: string;
    ownerInfo = {} as User;
    car = {} as Car;
    carId: string = "";

    private get userId(): string {
        return this.userService.getUser()._id;
    }

    constructor(
        private location: Location,
        private userService: UserService,
        private carApi: CarService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe((data) => {
            this.carId = data["carId"];
            this.subscribe$ = this.carApi
                .getCar(this.carId, this.userId)
                .subscribe({
                    next: (car) => {
                        if (car.owner === this.userId) {
                            this.isOwner = true;
                        }
                        this.car = car;

                        const owner$ = this.userService.getOwner(car.owner);
                        this.ownerSubs$ = owner$.subscribe({
                            next: (owner) => {
                                // console.log(owner);
                                this.ownerInfo = owner;
                            },
                            error: (err) => {
                                this.errorMsg = err.error.message;
                            },
                        });
                    },
                    error: (err) => (this.errorMsg = err.error.message),
                });
        });
    }

    onDelete(carId: string) {
        this.deleteMode = false;
        this.subscribe$ = this.carApi.deleteCar(carId).subscribe({
            error: (error) => (this.errorMsg = error.error.message),
            complete: () => this.router.navigate(["catalog/my-cars"]),
        });
    }

    onEdit(): void {
        this.router.navigate([`/catalog/my-cars/edit-car/${this.carId}`]);
    }

    onCancel(): void {
        this.deleteMode = false;
    }
    goBack(): void {
        this.location.back();
    }
    contact(): void {
        if (this.ownerInfo.email) {
            window.location.href = `mailto:${this.ownerInfo.email}`;
        } else {
            console.error("Email address is not available.");
        }
    }
    ngOnDestroy(): void {
        if (this.subscribe$) this.subscribe$.unsubscribe();
        if (this.ownerSubs$) this.ownerSubs$.unsubscribe();
    }
}
