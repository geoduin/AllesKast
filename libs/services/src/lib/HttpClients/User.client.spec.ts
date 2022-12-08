import { HttpClient, HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";
import { ConfigModule, CustomConfig } from "../ConfigModules/WebHttp.module";
import { WebHttpService } from "../ConfigModules/WebHttp.service";
import { DummyRepo } from "../Dummy/DummyRepo";
import { UserClient } from "./User.client";
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('Test test (1)', ()=>{
    let repo: DummyRepo;
    let service: UserClient;

    beforeEach(()=>{
        console.log("")
        repo = new DummyRepo();
        TestBed.configureTestingModule(
            {providers: [UserClient], imports: [HttpClientModule, ConfigModule.ForRoot({apiEndpoint: "localhost"})]}
        )
        service = TestBed.inject(UserClient);
    })

    it('Test existence of service', ()=>{
        expect(service).toBeTruthy();
    })
    
    it('Test getAll method', ()=>{
        service.GetAll().subscribe((l)=>{
            expect(l.length).toEqual(6);
        })
    })
    it('Test getOne method', ()=>{
        service.GetOne("1").subscribe((l)=>{
            expect(l.UserName).toEqual("Test broer");
        })
    })

    it('Test UpdateOne method', ()=>{
        service.UpdateOne("1", {
            PasswordConfirmation: "NieuwWachtwoord",
            EditPassword: true,
            Password: "OudWachtwoord",
            _id: "1",
            UserName: "TestbroerWijziging",
            DateOfBirth: new Date(),
            Email: "Test_broer@example.com",
            Role: "REGULAR"
        }).subscribe((l)=>{
            expect(l.UserName).toEqual("TestbroerWijziging");
            expect(l.Email).toEqual("Test_broer@example.com");
            expect(l.Role).toEqual("REGULAR");
            expect(l._id).toEqual("1");
        })
    })

    it('Test Delete method', ()=>{
        service.DeleteOne("1").subscribe((l)=>{
            expect(l.countDeleted).toEqual(1);
            expect(l).toBeTruthy();
        })
    })

    it('Test Create method', ()=>{
        service.CreateOne({ 
            _id: undefined,
            Password: "oUDERWetsewachtw00rd",
            UserName: "NieuweMakkersCHAP",
            DateOfBirth: new Date(),
            Email: "NieuweMakker@example.com",
            Role: "REGULAR"}).subscribe((v)=>{
                expect(v.message).toEqual("Creation succeeded");
                expect(v.result).toEqual(
                    {
                        _id: "2",
                        Id:"22344-2231423-1231242",
                        Password: "oUDERWetsewachtw00rd",
                        UserName: "NieuweMakkersCHAP",
                        DateOfBirth: new Date(),
                        Email: "NieuweMakker@example.com",
                        Role: "REGULAR",
                        FollowUserlist: [],
                        StoryFollowedlist: []
                })
            })
    })
})