import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarkTestComponent } from './vark-test.component';

describe('VarkTestComponent', () => {
  let component: VarkTestComponent;
  let fixture: ComponentFixture<VarkTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarkTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarkTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
