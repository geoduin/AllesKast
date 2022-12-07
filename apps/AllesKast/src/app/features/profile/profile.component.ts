import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivateUser } from '../../../../../../libs/data/src';
import { AuthService, StoryClient, UserClient } from '../../../../../../libs/services/src';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  Profile: Observable<PrivateUser>;

  constructor(private authService: AuthService, private userService: UserClient, private storyClient: StoryClient) {
    this.Profile = new Observable<PrivateUser>();
  }

  ngOnInit(): void {
    
  }
}
