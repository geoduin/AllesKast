import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningSignComponent } from './warning-sign.component';

describe('WarningSignComponent', () => {
  let component: WarningSignComponent;
  let fixture: ComponentFixture<WarningSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningSignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WarningSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
