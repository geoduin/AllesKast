import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryBtnComponent } from './story-btn.component';

describe('StoryBtnComponent', () => {
  let component: StoryBtnComponent;
  let fixture: ComponentFixture<StoryBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
