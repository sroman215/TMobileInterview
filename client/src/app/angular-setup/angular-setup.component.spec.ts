import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSetupComponent } from './angular-setup.component';

describe('AngularSetupComponent', () => {
  let component: AngularSetupComponent;
  let fixture: ComponentFixture<AngularSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
