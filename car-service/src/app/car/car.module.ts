import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarInfoComponent } from "./car-info/car-info.component";
import { TruncatePipe } from "../pipes/truncate.pipe";

@NgModule({
    declarations: [CarInfoComponent, TruncatePipe],
    imports: [CommonModule],
    exports: [CarInfoComponent],
})
export class CarModule {}
