import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityUser, SiteUser } from '../../../../../../../libs/data/src';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  UserList: Observable<SiteUser[]> = new Observable<SiteUser[]>();
  //UserList: IdentityUser[] = [];
  constructor(private userRepo: UserClient) { }

  ngOnInit(): void {
    this.UserList = this.userRepo.GetAll();
  }

  TestButton(){
    console.log(this.userRepo.Test());
  }
}
