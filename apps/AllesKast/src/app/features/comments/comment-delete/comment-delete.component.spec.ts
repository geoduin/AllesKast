import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDeleteComponent } from './comment-delete.component';

describe('CommentDeleteComponent', () => {
  let component: CommentDeleteComponent;
  let fixture: ComponentFixture<CommentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
