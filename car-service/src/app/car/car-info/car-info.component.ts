import { Component, Input, LOCALE_ID } from "@angular/core";

// Transform digits
import { registerLocaleData } from "@angular/common";
import localeBg from "@angular/common/locales/bg";
import { Car } from "src/app/types/car";

registerLocaleData(localeBg);
@Component({
    providers: [
        {
            provide: LOCALE_ID,
            useValue: "bg-BG",
        },
    ],
    selector: "app-car-info",
    templateUrl: "./car-info.component.html",
    styleUrls: ["./car-info.component.css"],
})
export class CarInfoComponent {
    isUser!: boolean;
    @Input() cars: Car[] = [];

    constructor() {}
}
