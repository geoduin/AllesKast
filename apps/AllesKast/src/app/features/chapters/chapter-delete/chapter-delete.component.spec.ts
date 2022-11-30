import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterDeleteComponent } from './chapter-delete.component';

describe('ChapterDeleteComponent', () => {
  let component: ChapterDeleteComponent;
  let fixture: ComponentFixture<ChapterDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
