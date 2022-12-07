import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IdentityUser, PrivateUser, ResponseMessage, SiteUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  
  user: PrivateUser | undefined;
  DetailUser: PrivateUser | undefined;
  UserRights$: Observable<boolean> | undefined;
  sub: Subscription;
  //DetailUser: IdentityUser | undefined;
  constructor(
    private route: ActivatedRoute, 
    private Users: UserClient, 
    private router: Router,
    private authService: AuthService) { 
      this.sub = new Subscription();
    }
  ngOnDestroy(): void {
    console.log("Gebruiker unsubbed");
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const Userid = params.get("UserId");
      console.log(Userid);
      
      if(Userid == 'Self'){
        this.sub = this.Users.GetOne("Self").subscribe((u)=>{
          this.DetailUser = u;
          this.UserRights$ = this.authService.IsEditable(u._id!);
        })
      }else if(Userid){
        this.sub = this.Users.GetOne(Userid!).subscribe((u)=>{
          this.user = u; 
          this.UserRights$ = this.authService.IsEditable(u._id!);
          //As a example of followed story list
          this.DetailUser = this.user
          //this.DetailUser.FollowedStories = this.Db.GetAllStories();
        });
      } else{
        console.log("Gebruiker niet gevonden");
        this.router.navigate([".."]);
      }
    })
  }

}
