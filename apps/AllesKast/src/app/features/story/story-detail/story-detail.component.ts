import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryDetail } from '../../../../../../../libs/data/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  story: StoryDetail | undefined | null;
  panelOpenState: boolean = false;
  
  constructor(private route: ActivatedRoute,private router: Router, private Db: DummyRepo) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param)=>{
        const UserId = param.get("StoryId");
        console.log(UserId);
        if(UserId){
          this.story = this.Db.FindOneStory(UserId);
          if(this.story){
            console.log(this.story);
          }else{
            console.warn("Verhaal niet gevonden");
          }
        }
    })
  }

}
