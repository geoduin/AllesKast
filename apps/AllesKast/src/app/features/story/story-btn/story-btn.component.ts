import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DummyRepo } from '../../../../../../../libs/Services/src/lib/Dummy/DummyRepo'
@Component({
  selector: 'app-story-btn',
  templateUrl: './story-btn.component.html',
  styleUrls: ['./story-btn.component.css'],
})
export class StoryBtnComponent {

  @Input()
  SId: string | undefined;

  constructor(private db: DummyRepo, private router: Router){
    console.log("Knop is ingeladen")
  }

  DeleteStory(){
    try {
      console.log(this.SId);
      console.warn("Verwijdering is  gestart");
      if(this.SId){
        this.db.Delete(this.SId);
        console.warn("Verwijdering is klaar");
        this.router.navigate([".."]);
      } else{
        console.warn("Niets verwijderd");
      }
    } catch (error) {
      console.log(error)
    }
  }
}
