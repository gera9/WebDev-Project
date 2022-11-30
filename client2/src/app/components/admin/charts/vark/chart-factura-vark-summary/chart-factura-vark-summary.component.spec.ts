import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFacturaVarkSummaryComponent } from './chart-factura-vark-summary.component';

describe('ChartFacturaVarkSummaryComponent', () => {
  let component: ChartFacturaVarkSummaryComponent;
  let fixture: ComponentFixture<ChartFacturaVarkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFacturaVarkSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartFacturaVarkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
