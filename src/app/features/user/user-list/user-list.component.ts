import { Component, OnInit } from '@angular/core';
import { DummyDB } from 'src/app/services/DummyDb';
import { IUser } from '../../domain/User.domain';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  UserList: IUser[] = [];

  constructor(private UserDb: DummyDB) { }

  ngOnInit(): void {
    this.UserList = this.UserDb.GetAllDummyUsers();
  }

}
