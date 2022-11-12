import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalComicsListComponent } from './normal-comics-list.component';

describe('NormalComicsListComponent', () => {
  let component: NormalComicsListComponent;
  let fixture: ComponentFixture<NormalComicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalComicsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalComicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
