import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../../../libs/services/src';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {
  
  LoggedIn: boolean | undefined
  
  constructor(private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenDialog(){

  }

  LogOut(){
    this.dialog.open(DialogComponent, {data: {naam: "Uitloggen"}}).afterClosed().subscribe((res)=>{
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
