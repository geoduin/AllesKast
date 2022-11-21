import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {
  
  LoggedIn: boolean | undefined
  
  constructor() { }

  ngOnInit(): void {
  }

}
