import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {
 
  Sign:string | null | undefined

  constructor(private route: ActivatedRoute, private Router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      this.Sign = param.get("StoryId");
      console.log(this.Sign);
      //If storyid is present. It will fill the form with editable data.
      if(this.Sign){
        console.log("Verhaal wijzigen");
      } else{
        //Otherwise it will fill in a new form
        console.log("Nieuwe verhaal aanmaken.");
      }
    })
  }

  OnSubmit():void{
    	try {
        

        this.Router.navigate([".."]);
      } catch (error) {
        
      }
  }

}
