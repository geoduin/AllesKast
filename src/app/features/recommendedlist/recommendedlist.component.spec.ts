import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedlistComponent } from './recommendedlist.component';

describe('RecommendedlistComponent', () => {
  let component: RecommendedlistComponent;
  let fixture: ComponentFixture<RecommendedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
