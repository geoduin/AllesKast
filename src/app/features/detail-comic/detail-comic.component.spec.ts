import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComicComponent } from './detail-comic.component';

describe('DetailComicComponent', () => {
  let component: DetailComicComponent;
  let fixture: ComponentFixture<DetailComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailComicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
