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
    private storyClient: StoryClient,
    private authService: AuthService) { 
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

}
