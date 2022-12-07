import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenlistComponent } from './writtenlist.component';

describe('WrittenlistComponent', () => {
  let component: WrittenlistComponent;
  let fixture: ComponentFixture<WrittenlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrittenlistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrittenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
