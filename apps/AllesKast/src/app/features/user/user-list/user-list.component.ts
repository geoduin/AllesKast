import { Component, OnInit } from '@angular/core';
import { IdentityUser } from '../../../../../../../libs/data/src';
import { DummyRepo } from '../../../../../../../libs/Services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  UserList: IdentityUser[] = [];

  constructor(private UserDb: DummyRepo) { }

  ngOnInit(): void {
    this.UserList = this.UserDb.GetAllDummyUsers();
  }

}
