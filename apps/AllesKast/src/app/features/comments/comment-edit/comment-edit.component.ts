import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { IComment, PrivateUser } from '../../../../../../../libs/data/src';
import { AuthService, CommentClient } from '../../../../../../../libs/services/src';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
})
export class CommentEditComponent implements OnInit, OnDestroy {
  
  SubComment = new Observable<any>();
  Titel = "Comment onder verhaal";
  EditOrCreate:boolean = false;
  CommentForm: IComment = {
    CommentId: undefined,
    UserId: '',
    Title: '',
    Content: '',
    PublishDate: new Date(),
    Username: ''
  };

  constructor(private authService: AuthService, private CommentClient: CommentClient, 
  @Inject(MAT_DIALOG_DATA) public data: {Editable: boolean, CId: string, StoryId: string}) {
    //If true, call api and retrieve comment;
    this.EditOrCreate = data.Editable;
  
  }

  ngOnInit(): void {
    console.log(`Editable ? ${this.EditOrCreate} StoryId: ${this.data.StoryId} CommentId: ${this.data.CId}`);
    this.EditOrCreate ? this.SetupExistingForm() : this.SetupNewForm();
  }

  SetupNewForm(){
    const User = this.authService.CurrentUser$.getValue() as PrivateUser;
    this.CommentForm.UserId = User._id!;
    this.CommentForm.Username = User.UserName!;
    console.log("Setup new form");
  }

  SetupExistingForm(){
    const s = this.CommentClient.getOne(this.data.CId, {StoryId: this.data.StoryId}).subscribe((res)=>{
      if(res){
        this.CommentForm = res;
        s.unsubscribe();
      } else{
        this.SetupNewForm();
        s.unsubscribe();
      }
      
    });
    console.log("Get Existing post");
  }
  
  SendComment(){
    console.log("Verstuur ingevulde comment");
    this.EditOrCreate ? this.UpdateComment() : this.CreateComment();
  }

  UpdateComment(){
    console.log("Comment gewijzigd");
    this.CommentClient.UpdateOne(this.data.CId, this.CommentForm, {StoryId: this.data.StoryId, CommentId: this.data.CId});
  }

  CreateComment(){
    console.log("Comment gemaakt");
    this.CommentClient.CreateOne(this.CommentForm, {StoryId: this.data.StoryId, CommentId: this.data.CId}).subscribe((rs)=>{
      console.log(rs);
    });
  }
  
  ngOnDestroy(): void {
    
  }

}
