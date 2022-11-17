import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DummyDB } from 'src/app/services/DummyDb';

@Component({
  selector: 'User-DeleteButton',
  templateUrl: './user-delete-btn.component.html',
  styleUrls: ['./user-delete-btn.component.css'],
  standalone: true
})
export class UserDeleteBtnComponent implements OnInit {

  @Input()
  Id: string | undefined | null

  constructor(private Db: DummyDB, private router: Router) { }

  ngOnInit(): void {
  }

  DeletionOfUser(){
    try{
      //If user Id is present. Delete user
      if(this.Id){
        
        //Deletion command
        this.Db.DeleteUser(this.Id);
        console.log(`Deletion of ${this.Id}`)
        //Returns to homepage
        this.router.navigate([".."]);
      } else{
        console.error("No user found");
         //Returns to homepage
         this.router.navigate([".."]);
      }
    }catch(err){
      console.error(err);
    }
  }

}
