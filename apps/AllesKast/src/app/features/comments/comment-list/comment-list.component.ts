import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
import { IComment } from '../../../../../../../libs/data/src';
import { AuthService, CommentClient } from '../../../../../../../libs/services/src';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input()
  StoryId: string;

  CommentSubscription: Subscription | undefined;
  Comments: IComment[] = [];
  //Comments$ = new BehaviorSubject<IComment[] | undefined>(undefined);

  constructor(    
    public authService: AuthService,
    private CommentDialog: MatDialog,
    private CommentClient: CommentClient) {
      this.StoryId = "";
    }

  ngOnInit(): void {
    const u = this.CommentClient.GetAll({StoryId: this.StoryId}).subscribe((val)=>{
      if(val){
        this.Comments = val;
      } else{
        console.log("Lege commentsectie")
      }
      u.unsubscribe();
    })
    
  }

  Authorized(UserId: string): Observable<boolean>{
    return this.authService.IsEditable(UserId);
  }

  MakeComment(){
    if(!this.authService.IsLoggedIn$.getValue()){
      console.warn("Moet ingelogd zijn");
      return;
    }
    this.OpenDialog(false, "", this.StoryId);
  }

  EditComment(CommentId: string){
    if(!this.authService.IsLoggedIn$.getValue()){
      console.warn("Moet ingelogd zijn");
      return;
    }
    this.OpenDialog(true, CommentId, this.StoryId);
  }

  DeleteComment(CommentId: string){
    if(!this.authService.IsLoggedIn$.getValue()){
      console.warn("Moet ingelogd zijn");
      return;
    }
    const u = this.CommentDialog.open(DialogComponent, {data: {naam: "verwijdering comment"}}).afterClosed().subscribe((v: any)=>{
      if(v){
        console.log("Delete comment");
        const i = this.CommentClient.Delete(CommentId, {StoryId: this.StoryId}).subscribe(()=>{
          console.log("Deletion completed");
          i.unsubscribe();
          this.ngOnInit();
        })
      }else{
        console.log("Comment not deleted");
      }
      u.unsubscribe();
    })
  }

  OpenDialog(Edit: boolean, ComId: string, StoryId: string){
    this.CommentSubscription = this.CommentDialog.open(CommentEditComponent, {data: { Editable: Edit, CId: ComId, StoryId: StoryId } }).afterClosed().subscribe(()=>{
      console.log("Comment is geplaatst");
      this.CommentSubscription?.unsubscribe();
      this.ngOnInit();
    })
  }
}
