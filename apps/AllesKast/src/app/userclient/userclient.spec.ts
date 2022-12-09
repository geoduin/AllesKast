import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ConfigModule, DummyRepo, UserClient } from "../../../../../libs/services/src";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from "rxjs";
import { EditUserVM, IdentityUser, PrivateUser, ResponseMessage } from "../../../../../libs/data/src";

describe('User service tests', ()=>{
    let repo: DummyRepo;
    let service: UserClient;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(()=>{
        console.log("")
        repo = new DummyRepo();

        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

        TestBed.configureTestingModule(
            {providers: [{provide: HttpClient, useValue: httpSpy}], imports: [ConfigModule.ForRoot({apiEndpoint: "localhost"})]}
        )
        httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
        service = TestBed.inject(UserClient);
    })

    it('Test existence of service', ()=>{
        expect(service).toBeTruthy();
    })
    
    it('Test getAll method', ()=>{
        httpSpy.get.and.returnValue(of(repo.UserArray));

        service.GetAll().subscribe((l)=>{
            console.log(l.length);
            expect(l.length).toEqual(5);
        })
    })
    it('Test getOne method', ()=>{
        const user:PrivateUser = {...repo.UserArray[0], Password: "Blablabla", FollowUserlist: [], StoryFollowedlist: []}
        const response = {status: 201, message: "een resultaat", result: user};
        httpSpy.get.and.returnValue(of(response));

        console.log(user);

        service.GetOne("1234").subscribe((l)=>{
            console.log(l);
            expect(l._id).toEqual("1234");
        })
    })

    it('Test UpdateOne method', ()=>{
        const InsertUser:EditUserVM = {
            PasswordConfirmation: "NieuwWachtwoord",
            EditPassword: true,
            Password: "OudWachtwoord",
            _id: "1",
            UserName: "TestbroerWijziging",
            DateOfBirth: new Date(),
            Email: "Test_broer@example.com",
            Role: "REGULAR"
        }
        const responseUser:IdentityUser = {
            Password: "OudWachtwoord",
            _id: "1",
            UserName: "TestbroerWijziging",
            DateOfBirth: new Date(),
            Email: "Test_broer@example.com",
            Role: "REGULAR"
        }
        const message: ResponseMessage = {status: 201, message: "miss", result: responseUser}
        httpSpy.put.and.returnValue(of(message));

        service.UpdateOne("1", InsertUser).subscribe((l)=>{
            expect(l.UserName).toEqual("TestbroerWijziging");
            expect(l.Email).toEqual("Test_broer@example.com");
            expect(l.Role).toEqual("REGULAR");
            expect(l._id).toEqual("1");
        })
    })

    it('Test Delete method', ()=>{
        const response= {
            countDeleted: 1
        }
        httpSpy.delete.and.returnValue(of(response));
        service.DeleteOne("1").subscribe((l)=>{
            const ll = l as unknown as any;
            expect(ll.countDeleted).toEqual(1);
            expect(ll).toBeTruthy();
        })
    })

    it('User is already removed', ()=>{
        const response = {
            countDeleted: 0
        }
        httpSpy.delete.and.returnValue(of(response));
        service.DeleteOne("1").subscribe((l)=>{
            const ll = l as unknown as any;
            expect(ll.countDeleted).toEqual(0);
            expect(ll).toBeTruthy();
        })
    })

    it('not the rights', ()=>{
        const response = {
            status: 406,
            message: "Token verificatie is misgegaan"
        }
        httpSpy.delete.and.returnValue(of(response));
        service.DeleteOne("1").subscribe((l)=>{
            const ll = l as unknown as any; 
            expect(ll.status).toEqual(406);
            expect(ll.message).toEqual("Token verificatie is misgegaan");
        })
    })

    it('Test Create method', ()=>{
        const insert = { 
            _id: undefined,
            Password: "oUDERWetsewachtw00rd",
            UserName: "NieuweMakkersCHAP",
            DateOfBirth: new Date(),
            Email: "NieuweMakker@example.com",
            Role: "REGULAR"};

            const result = {
                _id: "2",
                Id:"22344-2231423-1231242",
                Password: "oUDERWetsewachtw00rd",
                UserName: "NieuweMakkersCHAP",
                DateOfBirth: new Date(),
                Email: "NieuweMakker@example.com",
                Role: "REGULAR",
                FollowUserlist: [],
                StoryFollowedlist: []
        }

        const response = { message: "Creation succeeded", result: result};
        httpSpy.post.and.returnValue(of(response));
        service.CreateOne(insert).subscribe((v)=>{
                expect(v.message).toEqual("Creation succeeded");
                expect(v.result).toEqual(result)
            })
    })

    it('Test duplication creation', ()=>{
        const insert = { 
            _id: undefined,
            Password: "oUDERWetsewachtw00rd",
            UserName: "NieuweMakkersCHAP",
            DateOfBirth: new Date(),
            Email: "NieuweMakker@example.com",
            Role: "REGULAR"};

        const response = { message: "User creation failed"};
        httpSpy.post.and.returnValue(of(response));
        service.CreateOne(insert).subscribe((v)=>{
                expect(v.message).toEqual("User creation failed");
            })
    })
})