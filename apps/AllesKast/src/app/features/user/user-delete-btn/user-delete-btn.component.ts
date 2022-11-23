import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/Services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'User-DeleteButton',
  templateUrl: './user-delete-btn.component.html',
  styleUrls: ['./user-delete-btn.component.css'],
  standalone: true
})
export class UserDeleteBtnComponent implements OnInit {

  @Input()
  Id: string | undefined | null

  constructor(private Db: DummyRepo, private router: Router, private userClient:UserClient) { }

  ngOnInit(): void {
  }

  DeletionOfUser(){
    try{
      //If user Id is present. Delete user
      if(this.Id){
        this.userClient.DeleteOne(this.Id).subscribe((deleted)=>{
          console.log(`Deletion of ${this.Id}`)
          //Returns to homepage
          this.router.navigate([".."]); 
        });
        
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
