import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFacturaSummaryComponent } from './chart-factura-summary.component';

describe('ChartFacturaSummaryComponent', () => {
  let component: ChartFacturaSummaryComponent;
  let fixture: ComponentFixture<ChartFacturaSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFacturaSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartFacturaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
