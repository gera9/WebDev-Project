import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEdiVarkSummaryComponent } from './chart-edi-vark-summary.component';

describe('ChartEdiVarkSummaryComponent', () => {
  let component: ChartEdiVarkSummaryComponent;
  let fixture: ComponentFixture<ChartEdiVarkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartEdiVarkSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartEdiVarkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
