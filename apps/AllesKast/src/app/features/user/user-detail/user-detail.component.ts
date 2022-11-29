import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityUser, SiteUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  
  user: IdentityUser | undefined;
  DetailUser: SiteUser | undefined;
  UserRights$: Observable<boolean> | undefined;
  //DetailUser: IdentityUser | undefined;
  constructor(
    private route: ActivatedRoute, 
    private Db: DummyRepo, 
    private Users: UserClient, 
    private router: Router,
    private authService: AuthService) { 
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const Userid = params.get("UserId");
      this.UserRights$ = this.authService.IsEditable(Userid!);
      if(Userid){
        this.Users.GetOne(Userid!).subscribe((u)=>{
          this.user = u; 

          //As a example of followed story list
          this.DetailUser = new SiteUser(this.user!._id!, this.user!.UserName!, this.user!.DateOfBirth!, this.user!.Email!, this.user!.Role!);
          this.DetailUser.FollowedStories = this.Db.GetAllStories();
        });
      } else{
        console.log("Gebruiker niet gevonden");
        this.router.navigate([".."]);
      }
    })
  }

}
