import { Component, Input, OnInit } from '@angular/core';
import { IdentityUser, SiteUser } from '../../../../../../../libs/data/src';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  User: SiteUser | undefined
  
  constructor() { }

  ngOnInit(): void {
  }

}
