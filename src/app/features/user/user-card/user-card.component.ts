import { Component, Input, OnInit } from '@angular/core';
import { IStory } from '../../domain/Story.domain';
import { IdentityUser, SiteUser } from '../../domain/User.domain';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  User: IdentityUser | undefined
  
  constructor() { }

  ngOnInit(): void {
  }

}
