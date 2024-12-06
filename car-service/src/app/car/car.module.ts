import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarInfoComponent } from "./car-info/car-info.component";

@NgModule({
    declarations: [CarInfoComponent],
    imports: [CommonModule],
    exports: [CarInfoComponent],
})
export class CarModule {}
