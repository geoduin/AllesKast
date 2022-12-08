import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EditUserVM, PrivateUser, ResponseMessage } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { UiModule } from '../../../../../../../libs/ui/src';
import { RegistrationComponent } from '../../../authentication/registration/registration.component';
import { BackBtnComponent } from '../../../shared/back-btn/back-btn.component';

import { UserEditComponent } from './user-edit.component';

describe('Edit user page opened', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  //Mockservices
  let MockUserClient:jasmine.SpyObj<UserClient>;
  let MockRouter:jasmine.SpyObj<Router>;
  let MockAuthService:jasmine.SpyObj<AuthService>;

  //Return observables
  let ReturnUser: Observable<PrivateUser>;
  let ReturnUserUpdated: Observable<PrivateUser>;
  let UserForm: EditUserVM;
  let u: PrivateUser;
  let u2: PrivateUser;
  //Overig
  let TestWarning:string;
  let Titel:string;
  let IsEdit:boolean;

  beforeEach(async () => {
    
    //Mock
    MockUserClient = jasmine.createSpyObj('UserClient', ['CreateOne', 'GetOne', 'UpdateOne'])
    MockRouter = jasmine.createSpyObj('Router', ['navigate'])
    MockAuthService = jasmine.createSpyObj('authService', ['RefreshUser', 'HasFollowed'])

    //Return waarden
    u = {
      _id: "12349876",
      UserName: "Undertaker$1",
      Password: "blabalanasdsadf",
      Email: "UndertakerGG@example.com",
      Role: "REGULAR",
      DateOfBirth: new Date(),
      FollowUserlist: [],
      StoryFollowedlist: []
    }
    u2 = {
      _id: "12349876",
      UserName: "Undertaker$1",
      Password: "blabalanasdsadf",
      Email: "NieuweEmail@example.com",
      Role: "REGULAR",
      DateOfBirth: new Date(),
      FollowUserlist: [],
      StoryFollowedlist: []
    }


    ReturnUser = of(u);
    ReturnUserUpdated = of(u2);
    UserForm = {...u, "PasswordConfirmation": "", "EditPassword": true};


    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent, BackBtnComponent ],
      imports: [
        ReactiveFormsModule, 
        FormsModule,
        UiModule,
        BrowserAnimationsModule,],
      providers: [
        {provide: UserClient, useValue:MockUserClient},
        {provide: Router, useValue: MockRouter},
        {provide: AuthService, useValue: MockAuthService},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                UserId: "12349876"
              }))
        }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show edit form', () => {
    MockUserClient.GetOne.and.returnValue(ReturnUser);
    component.ngOnInit();

    expect(component.IsEdit).toBe(true);
    expect(component.User).toEqual(UserForm)
  });

  it('Send updated user to client.', () => {

    //Update methode pakken.
    MockUserClient.GetOne.and.returnValue(ReturnUser);
    MockAuthService.RefreshUser.and.returnValue(of("Opgeslagen"));
    MockUserClient.UpdateOne.and.returnValue(ReturnUserUpdated);
    component.ngOnInit();

    expect(component.IsEdit).toBe(true);
    expect(component.User).toEqual(UserForm)

    UserForm.Email = "NieuweEmail@example.com"
    UserForm.PasswordConfirmation = UserForm.Password!;

    component.onSubmit();
    fixture.detectChanges();
    
    //Submit wijziging;
    expect(MockRouter.navigate).toHaveBeenCalled();
  });
});


//De app opent eigenlijk een registratie component, maar bevat geen enkele logica of html-elementen, op de user edit component na.
describe('Registratie van een gebruiker is geopend', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  //Mockservices
  let MockUserClient:any;
  let MockRouter:any;
  let MockAuthService:any;

  //Return observables
  let ReturnUser: Observable<PrivateUser>;
  let ReturnUserUpdated: Observable<PrivateUser>;
  let UserForm: EditUserVM;
  let u: PrivateUser;
  let u2: PrivateUser;
  //Overig
  let TestWarning:string;
  let Titel:string;
  let IsEdit:boolean;
  let date2 = new Date("2001-10-13");

  beforeEach(async () => {
    
    //Mock
    MockUserClient = jasmine.createSpyObj('UserClient', ['CreateOne', 'GetOne', 'UpdateOne'])
    MockRouter = jasmine.createSpyObj('Router', ['navigate'])
    MockAuthService = jasmine.createSpyObj('authService', ['RefreshUser', 'HasFollowed'])

    //Return waarden
    const date = new Date("2001-10-13");
    UserForm = {
      _id: undefined,
      UserName: "",
      Password: "",
      Email: "",
      Role: "REGULAR",
      DateOfBirth: date,
      "PasswordConfirmation": "", 
      "EditPassword": false
    }

    u = {
      _id: "22222",
      UserName: "Nieuwe gebruiker",
      Password: "asdhjdsfhkjsfdhjdsf",
      Email: "NieuweEmail@example.com",
      Role: "REGULAR",
      DateOfBirth: new Date("1990-10-10"),
      FollowUserlist: [],
      StoryFollowedlist: []
    }


    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent, BackBtnComponent, ],
      imports: [
        ReactiveFormsModule, 
        FormsModule,
        UiModule,
        BrowserAnimationsModule,],
      providers: [
        {provide: UserClient, useValue:MockUserClient},
        {provide: Router, useValue: MockRouter},
        {provide: AuthService, useValue: MockAuthService},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                UserId: undefined
              }))
        }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show registration form', () => {
    component.User.DateOfBirth = date2;
    component.ngOnInit();

    expect(component.IsEdit).toEqual(false);
    expect(component.User).toEqual(UserForm)
    expect(component.Pagina).toEqual("Registratieformulier");
  });

  it('Send new user to client.', () => {
    //Laad registratie pagina.
       //Response waarde
    const response:any= {"message": "Creation succeeded", "result": u} 
    const Observed = of(response);
    MockUserClient.CreateOne.and.returnValue(Observed);
     
    component.ngOnInit();

    expect(component.IsEdit).toBe(false);

    //Vul formulier in;
    component.User.UserName = "Nieuwe gebruiker"
    component.User.Email = "NieuweEmail@example.com"
    component.User.DateOfBirth = new Date("1990-10-10");
    component.User.Password = "GeheimWachtwoord";
    component.User.Role = "REGULAR";
    component.onSubmit();


    //Submit wijziging;
    fixture.detectChanges();
    expect(MockUserClient.CreateOne).toHaveBeenCalled();
  });

  it('Duplicate user data.', () => {
    //Laad registratie pagina.
       //Response waarde
    const response:any= {"message": "User creation failed"} 
    const Observed = of(response);
    MockUserClient.CreateOne.and.returnValue(Observed);
    TestWarning = "Foute input gegeven"
    component.ngOnInit();

    expect(component.IsEdit).toBe(false);

    //Vul formulier in;
    component.User.UserName = "Nieuwe gebruiker"
    component.User.Email = "NieuweEmail@example.com"
    component.User.DateOfBirth = new Date("1990-10-10");
    component.User.Password = "GeheimWachtwoord";
    component.User.Role = "REGULAR";
    component.onSubmit();


    //Submit wijziging;
    fixture.detectChanges();
    expect(MockUserClient.CreateOne).toHaveBeenCalled();
    expect(component.Warning).toEqual(TestWarning)
  });
});