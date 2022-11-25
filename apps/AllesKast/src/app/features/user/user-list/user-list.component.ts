import { Component, OnInit } from '@angular/core';
import { IdentityUser, SiteUser } from '../../../../../../../libs/data/src';
import { UserClient } from '../../../../../../../libs/service/src';
import { DummyRepo } from '../../../../../../../libs/service/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  UserList: SiteUser[] = [];

  constructor(private UserDb: DummyRepo, private userRepo: UserClient) { }

  ngOnInit(): void {
    this.userRepo.GetAll().subscribe((list)=>{
      this.UserList = list;
    });
  }

  TestButton(){
    console.log(this.userRepo.Test());
  }
}
