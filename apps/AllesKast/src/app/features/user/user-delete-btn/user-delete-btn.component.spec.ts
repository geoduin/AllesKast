import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivateUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { UiModule } from '../../../../../../../libs/ui/src';

import { UserDeleteBtnComponent } from './user-delete-btn.component';

describe('Delete user component', () => {
  let component: UserDeleteBtnComponent;
  let fixture: ComponentFixture<UserDeleteBtnComponent>;

  let MockRouter: any;
  let MockUserClient: jasmine.SpyObj<UserClient>;
  let MockAuthService: jasmine.SpyObj<AuthService>;

  let u: PrivateUser;
  beforeEach(async () => {
    MockUserClient = jasmine.createSpyObj('UserClient', ['DeleteOne', 'GetAll', 'GetOne']);
    MockAuthService = jasmine.createSpyObj('AuthService', ['Logout']);
    MockRouter = jasmine.createSpyObj('Router', ['navigate'])
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
    await TestBed.configureTestingModule({
      declarations: [ UserDeleteBtnComponent ],
      imports: [UiModule, RouterModule],
      providers:[
        {provide: UserClient, useValue: MockUserClient},
        {provide: Router, useValue: MockRouter},
        {provide: AuthService, useValue: MockAuthService}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserDeleteBtnComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });
  it('should delete user', () => {
    component.Id = "12349876";
    const Result = {acknowledged: true, deletedCount: 1};
    const ObservableRsult:Observable<any> = of(Result);
    MockUserClient.DeleteOne.and.returnValue(ObservableRsult);
    component.ngOnInit()
    
    component.DeletionOfUser();
    
    console.log(u);
    expect(MockRouter.navigate).toHaveBeenCalled();
    expect(MockAuthService.Logout).toHaveBeenCalled();
  });

  it('should create deletebtn', () => {
    expect(component).toBeTruthy();
  });

  it('No deleted user', () => {
    component.Id = undefined;
    component.ngOnInit()
    
    component.DeletionOfUser();
    expect(MockRouter.navigate).toHaveBeenCalled();
  });
});
