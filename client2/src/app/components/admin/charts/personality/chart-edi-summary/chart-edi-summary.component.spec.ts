import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEdiSummaryComponent } from './chart-edi-summary.component';

describe('ChartEdiSummaryComponent', () => {
  let component: ChartEdiSummaryComponent;
  let fixture: ComponentFixture<ChartEdiSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartEdiSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartEdiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
