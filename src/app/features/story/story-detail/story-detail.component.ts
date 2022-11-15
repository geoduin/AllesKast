import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DummyDB } from 'src/app/services/DummyDb';
import { Story } from '../../domain/Story.domain';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  story: Story | undefined | null;

  constructor(private route: ActivatedRoute,private router: Router, private Db: DummyDB) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((param)=>{
        const UserId = param.get("UserId");
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
