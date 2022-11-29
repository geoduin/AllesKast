import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PrivateUser } from '../../../../../../../libs/data/src';
import { AuthService } from '../../../../../../../libs/services/src';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {
  
  IsLoggedIn$: Observable<boolean>;
  CurrentUser$: Observable<PrivateUser | undefined>;
  constructor(private auth: AuthService, private dialog: MatDialog) { 
    this.IsLoggedIn$ = new Observable<boolean>();
    this.CurrentUser$ = new Observable<PrivateUser>();
  }

  ngOnInit(): void {
    this.IsLoggedIn$ = this.auth.IsLoggedIn$.asObservable();
    this.CurrentUser$ = this.auth.CurrentUser$.asObservable();
    console.log("Status login");
    console.log(this.IsLoggedIn$);
  }

  OpenDialog(){

  }

  LogOut(){
    this.dialog
    .open(DialogComponent, {data: {naam: "Uitloggen"}})
    .afterClosed()
    .subscribe((res)=>{
      console.log(res);
      if(res){
        console.log("Gebruiker is uitgelogd");
        this.auth.Logout();
      }else{
        console.log("Dialog box is loser")
      }
      
    });
  }

}
