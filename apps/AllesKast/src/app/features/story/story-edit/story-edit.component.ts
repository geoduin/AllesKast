import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IStory, StoryDetail } from '../../../../../../../libs/data/src';
import { StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/Services/src/lib/Dummy/DummyRepo';


@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {
 
  IsEdit = false;
  Sign:string | null | undefined;
  NewStory: IStory | undefined;
  constructor(private route: ActivatedRoute, private Router: Router, private Repo: DummyRepo, private client: StoryClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      this.Sign = param.get("StoryId");
      console.log(this.Sign);
      
      //If storyid is present. It will fill the form with editable data.
      if(this.Sign){
        //Database command to retrieve data from database;
        this.IsEdit = true;
        this.NewStory = this.Repo.FindOneStory(this.Sign);
        console.log(this.NewStory);
        console.log("Verhaal wijzigen");
      } else{
        //Otherwise it will fill in a new form
        this.IsEdit = false
        let random = Math.random() * 120;
        this.NewStory = {
          Id: random.toFixed(),
          Title: "",
          PublishDate: new Date(),
          StoryLine: "",
          Genres: "",
          Writer: undefined,
          IsAdultOnly: false,
        }
        
      }
    })
  }

  OnSubmit():void{
    	try {
          if(!this.IsEdit){
            this.Repo.AddStory(this.NewStory!);
            console.log(this.Repo);
            console.log("Nieuwe verhaal aanmaken.");
            this.Router.navigate([".."]);
          } else{
            //Wijzigt verhaal, exclusief hoofdstukken.
            this.Repo.Update(this.NewStory!);
            console.log("Nieuwe verhaal aanmaken.");
            this.Router.navigate([".."]);
          }
      } catch (error) {
        this.Router.navigate([".."]);
      }
  }

}
