import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'User-DeleteButton',
  templateUrl: './user-delete-btn.component.html',
  styleUrls: ['./user-delete-btn.component.css'],
})
export class UserDeleteBtnComponent implements OnInit {

  @Input()
  Id: string | undefined | null

  constructor(private router: Router, private userClient:UserClient) { }

  ngOnInit(): void {
  }

  DeletionOfUser(){
    try{
      //If user Id is present. Delete user
      if(this.Id){
        console.log(`Id is ${this.Id}`);
        this.userClient
        .DeleteOne(this.Id)
        .subscribe(()=>{
          console.log(`Deletion of ${this.Id}`)
          const endresponse = "Verwijdering is voltooid";
          console.log(endresponse);
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
