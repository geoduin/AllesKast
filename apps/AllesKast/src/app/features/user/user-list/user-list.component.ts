import { Component, OnInit } from '@angular/core';
import { DummyDB } from '../../../services/DummyDb';
import { IdentityUser, IUser } from '../../domain/User.domain';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  UserList: IdentityUser[] = [];

  constructor(private UserDb: DummyDB) { }

  ngOnInit(): void {
    this.UserList = this.UserDb.GetAllDummyUsers();
  }

}
