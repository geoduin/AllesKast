import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivateUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { AppRoutingModule } from '../../../app-routing.module';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';

import { UserDetailComponent } from './user-detail.component';

describe('Detail Users component', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  //DummyRepo
  let dummyRepo: DummyRepo;

  //Mockservice
  let MockAuthService: any;
  let MockRouter;
  let MockUserClient: any;
  let MockActivatedRoute: any;

  //Mock observables editable$ en DetailUser;
  let OtherMockUser: PrivateUser
  let OwnMockUser: PrivateUser
  let MockEditable$: Observable<boolean>;
  let OtherObserver: Observable<PrivateUser>;
  let FalseEditable: Observable<boolean>;
  beforeEach(async () => {

    //Maak mock waarde;
    MockUserClient =  jasmine.createSpyObj('UserClient', ['GetAll', 'GetOne']);
    MockAuthService = jasmine.createSpyObj('AuthService', ['IsEditable']);
    MockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['paramMap'])
    MockRouter = jasmine.createSpyObj('Router', ['navigate']);

    //Dummyrepo
    dummyRepo = new DummyRepo();

    //Wijs mockattributen toe;
    OtherMockUser = {_id: "1234", UserName: "Donald", Email: "Donald@example", Password: "", Role: "REGULAR", DateOfBirth: new Date(), "FollowUserlist": [], "StoryFollowedlist": []};
    OwnMockUser = {_id: "1000", UserName: "Harold", Email: "Harold@example", Password: "", Role: "REGULAR", DateOfBirth: new Date(), "FollowUserlist": [], "StoryFollowedlist": []};
    
    FalseEditable = of(false);
    OtherObserver = of(OtherMockUser);
    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent, BackBtnComponent ],
      imports: [AppRoutingModule],
      providers: [
        {provide: UserClient, useValue: MockUserClient},
        {provide: AuthService, useValue: MockAuthService},
        {provide: Router, useValue: MockRouter},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                UserId: "1234"
              }))
        }}
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

  it('Static elements are present', () => {

    MockUserClient.GetOne.and.returnValue(OtherObserver)
    component.ngOnInit();
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Gebruiker');
    expect(bannerElement.textContent).toContain('Rol');
  });

  it('Details of user is assigned to user.', () => {

    MockUserClient.GetOne.and.returnValue(OtherObserver)
    MockAuthService.IsEditable.and.returnValue(false);
    component.ngOnInit();
    
    expect(component.DetailUser).toEqual(OtherMockUser);
  });

  it('Random user is not editable', () => {

    MockUserClient.GetOne.and.returnValue(OtherObserver)
    MockAuthService.IsEditable.and.returnValue(FalseEditable);
    component.ngOnInit();
    
    expect(component.UserRights$).toEqual(FalseEditable);
  });
});

describe('UserDetailComponent own user', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  //DummyRepo
  let dummyRepo: DummyRepo;

  //Mockservice
  let MockAuthService: any;
  let MockRouter:any;
  let MockUserClient: any;

  //Mock observables editable$ en DetailUser;
  let OtherMockUser: PrivateUser
  let OwnMockUser: PrivateUser
  let MockEditable$: Observable<boolean>;
  let OwnObserver: Observable<PrivateUser>;
  let FalseEditable: Observable<boolean>;
  beforeEach(async () => {

    //Maak mock waarde;
    MockUserClient =  jasmine.createSpyObj('UserClient', ['GetAll', 'GetOne']);
    MockAuthService = jasmine.createSpyObj('AuthService', ['IsEditable']);
    MockRouter = jasmine.createSpyObj('Router', ['navigate']);

    //Dummyrepo
    dummyRepo = new DummyRepo();

    //Wijs mockattributen toe;
    OwnMockUser = {_id: "1000", UserName: "Harold", Email: "Harold@example", Password: "", Role: "REGULAR", DateOfBirth: new Date(), "FollowUserlist": [], "StoryFollowedlist": []};
    
    MockEditable$ = of(true);
    OwnObserver = of(OwnMockUser);

    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent, BackBtnComponent ],
      imports: [AppRoutingModule],
      providers: [
        {provide: UserClient, useValue: MockUserClient},
        {provide: AuthService, useValue: MockAuthService},
        {provide: Router, useValue: MockRouter},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                UserId: "Self"
              }))
        }}
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

  it('Static elements are present', () => {

    MockUserClient.GetOne.and.returnValue(OwnObserver);
    const bannerElement: HTMLElement = fixture.nativeElement;
    component.ngOnInit();
    
    console.log(bannerElement.textContent);
    expect(bannerElement.textContent).toContain('Gebruiker');
    expect(bannerElement.textContent).toContain('Rol');
  });

  it('Details of own user is assigned to user.', () => {

    MockUserClient.GetOne.and.returnValue(OwnObserver)
    MockAuthService.IsEditable.and.returnValue(MockEditable$);
    component.ngOnInit();
    
    expect(component.DetailUser).toEqual(OwnMockUser);
  });

  it('own user is editable', () => {

    MockUserClient.GetOne.and.returnValue(OwnObserver)
    MockAuthService.IsEditable.and.returnValue(MockEditable$);
    component.ngOnInit();
    
    expect(component.UserRights$).toEqual(MockEditable$);
  });


});