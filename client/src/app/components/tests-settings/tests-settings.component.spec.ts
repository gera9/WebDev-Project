import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsSettingsComponent } from './tests-settings.component';

describe('TestsSettingsComponent', () => {
  let component: TestsSettingsComponent;
  let fixture: ComponentFixture<TestsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
