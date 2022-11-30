import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGlobalSummaryComponent } from './chart-global-summary.component';

describe('ChartGlobalSummaryComponent', () => {
  let component: ChartGlobalSummaryComponent;
  let fixture: ComponentFixture<ChartGlobalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGlobalSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGlobalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
