import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarInfoComponent } from "./car-info/car-info.component";
import { TruncatePipe } from "../pipes/truncate.pipe";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [CarInfoComponent, TruncatePipe],
    imports: [CommonModule, RouterModule],
    exports: [CarInfoComponent],
})
export class CarModule {}
