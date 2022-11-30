import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoryDetail } from '../../../../../../../libs/data/src';
import { AuthService, StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  story: StoryDetail | undefined | null;
  panelOpenState: boolean = false;
  Editable$ : Observable<boolean> | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private Db: DummyRepo, 
    private storyClient: StoryClient,
    private authService: AuthService) { }
  
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param)=>{
        const UserId = param.get("StoryId");
        console.log(UserId);
        if(UserId){
          
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
