import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StoryDetail } from '../../../../../../../libs/data/src';
import { AuthService, CommentClient, StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';
import { CommentEditComponent } from '../../comments/comment-edit/comment-edit.component';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  StoryId: string;
  story: StoryDetail | undefined | null;
  panelOpenState: boolean = false;
  Editable$ : Observable<boolean> | undefined;
  CommentSubscription: Subscription | undefined;
  RouteSub: Subscription | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private Db: DummyRepo, 
    private storyClient: StoryClient,
    private authService: AuthService,
    private CommentDialog: MatDialog,
    private CommentClient: CommentClient) { 
      this.StoryId = "";
    }
  
  ngOnDestroy(): void {
    this.RouteSub?.unsubscribe();
  }
  
  async ngOnInit(): Promise<void> {
   this.RouteSub = this.route.paramMap.subscribe((param)=>{
        const UserId = param.get("StoryId");
        
        console.log(UserId);
        if(UserId){
          this.StoryId = UserId
          this.storyClient.GetOne(UserId, {}).subscribe((story: StoryDetail | null | undefined)=>{
            this.story = story;
            this.Editable$ = this.authService.IsEditable(this.story?.Writer?._id!);
            if(story){
              console.log(story);
            }else{
              console.warn("Verhaal niet gevonden");
            }
          })
          
        }
    })
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
