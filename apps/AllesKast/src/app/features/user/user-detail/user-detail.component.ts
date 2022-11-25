import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentityUser, SiteUser } from '../../../../../../../libs/data/src';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  
  user: IdentityUser | undefined;
  DetailUser: SiteUser | undefined;
  //DetailUser: IdentityUser | undefined;
  constructor(private router: ActivatedRoute, private Db: DummyRepo, private Users: UserClient) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params)=>{
      const Userid = params.get("UserId");
      if(Userid){
        this.user = this.Db.FindOneUser(Userid);
        this.DetailUser = this.user as unknown as SiteUser;
        this.DetailUser.FollowedStories = this.Db.GetAllStories();
      }
      /*this.Users.GetOne(Userid!).subscribe((u)=>{
        this.user = u; 
        console.log(this.user?.DateOfBirth);
        //As a example of followed story list
        this.DetailUser = new SiteUser(this.user!._id!, this.user!.UserName!, this.user!.DateOfBirth!, this.user!.Email!, this.user!.Role!);
        this.DetailUser.FollowedStories = this.Db.GetAllStories();
      });*/
      
    })
  }

}
