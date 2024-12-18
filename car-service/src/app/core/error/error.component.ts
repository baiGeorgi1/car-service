import { Component, OnInit } from "@angular/core";
import { ErrorService } from "./error.service";

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.css"],
})
export class ErrorComponent implements OnInit {
    errorMsg = "";

    constructor(private errorService: ErrorService) {}

    ngOnInit(): void {
        // Взимаме субджекта от errorService
        this.errorService.apiError$.subscribe((err: any) => {
            // console.log("Error:", err.error);
            this.errorMsg = err?.error || "";
        });
    }
}
