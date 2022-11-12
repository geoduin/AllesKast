import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBtnComponent } from './detail-btn.component';

describe('DetailBtnComponent', () => {
  let component: DetailBtnComponent;
  let fixture: ComponentFixture<DetailBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
