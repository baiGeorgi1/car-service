import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FeaturedCarsComponent } from "./catalog.component";

describe("FeaturedCarsComponent", () => {
    let component: FeaturedCarsComponent;
    let fixture: ComponentFixture<FeaturedCarsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FeaturedCarsComponent],
        });
        fixture = TestBed.createComponent(FeaturedCarsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
