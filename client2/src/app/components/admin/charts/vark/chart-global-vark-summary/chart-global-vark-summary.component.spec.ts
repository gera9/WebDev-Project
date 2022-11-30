import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGlobalVarkSummaryComponent } from './chart-global-vark-summary.component';

describe('ChartGlobalVarkSummaryComponent', () => {
  let component: ChartGlobalVarkSummaryComponent;
  let fixture: ComponentFixture<ChartGlobalVarkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGlobalVarkSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGlobalVarkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
