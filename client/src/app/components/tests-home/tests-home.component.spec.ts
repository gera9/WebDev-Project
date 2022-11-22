import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsHomeComponent } from './tests-home.component';

describe('TestsHomeComponent', () => {
  let component: TestsHomeComponent;
  let fixture: ComponentFixture<TestsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
