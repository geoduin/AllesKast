import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SiteUser } from '../../../../../../../libs/data/src';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  //Mockservices
  let MockUserClient:any;
  let dummyRepo: DummyRepo;
  let ObservedUserList: Observable<SiteUser[]>;

  beforeEach(async () => {

    //Maak spies on Mockservices
    MockUserClient =  jasmine.createSpyObj('UserClient', ['GetAll']);

    //Haal mock data op uit repo
    dummyRepo = new DummyRepo();

    //Wijst een waarde toe.
    ObservedUserList = of(dummyRepo.UserArray);

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent, BackBtnComponent ],
      imports: [HttpClientModule],
      providers: [
        {provide: UserClient, useValue: MockUserClient}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('should contain h2 title "Gebruikerlijst"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Gebruikerlijst');
  });

  afterEach(()=>{
    fixture.destroy();
  })
  it('Gets a list of users', () => {
    console.log(component);
    //Mocks return waarde in de service.
    MockUserClient.GetAll.and.returnValue(ObservedUserList)
    
    console.log(ObservedUserList);
    //Laadt component
    component.ngOnInit();

    //Resultaat
    expect(component.UserList).toEqual(ObservedUserList);
  });
});
