import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrivateUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  //DummyRepo
  let dummyRepo: DummyRepo;

  //Mockservice
  let MockAuthService;
  let MockRouter;
  let MockUserClient;
  let MockActivatedRoute;

  //Mock observables editable$ en DetailUser;
  let OtherMockUser: PrivateUser
  let OwnMockUser: PrivateUser
  let MockEditable$: Observable<boolean>;

  beforeEach(async () => {

    //Maak mock waarde;
    MockUserClient =  jasmine.createSpyObj('UserClient', ['GetAll', 'GetOne', 'subscribe']);
    MockAuthService = jasmine.createSpyObj('AuthService', ['IsEditable']);
    MockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['subscribe'])
    MockRouter = jasmine.createSpyObj('Router', ['navigate']);

    //Dummyrepo
    dummyRepo = new DummyRepo();

    //Wijs mockattributen toe;
    //OtherMockUser = dummyRepo.UserArray[0];
    //OwnMockUser = dummyRepo.UserArray[1];

    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      providers: [
        {provide: UserClient, useValue: MockUserClient},
        {provide: AuthService, useValue: MockAuthService},
        {provide: Router, useValue: MockRouter},
        {provide: ActivatedRoute, useValue: MockActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
