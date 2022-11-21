import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DummyDB } from '../../../services/DummyDb';
import { IdentityUser, SiteUser, User } from '../../domain/User.domain';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  
  user: IdentityUser | undefined;
  DetailUser: SiteUser | undefined;

  constructor(private router: ActivatedRoute, private Db: DummyDB) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params)=>{
      const Userid = params.get("UserId")
      console.log(Userid);
      this.user = this.Db.GetAllDummyUsers().filter(u => u.Id == Userid)[0];
      //As a example of followed story list
      this.DetailUser = new SiteUser(this.user.Id!, this.user.UserName!, this.user.DateOfBirth!, this.user.Email!, this.user.Role!);
      this.DetailUser.FollowedStories = this.Db.GetAllStories();
    })
  }

}
