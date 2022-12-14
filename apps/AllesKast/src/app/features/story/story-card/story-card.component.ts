import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoryDetail, IStory } from '../../../../../../../libs/data/src';
import { AuthService, RecommendedClient } from '../../../../../../../libs/services/src';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {
  @Input()
  Story: IStory | undefined
  
  IsDisabled: boolean;
  IsLogged$: Observable<boolean>;
  DoesFollow$: BehaviorSubject<boolean>;

  constructor(private rcd: RecommendedClient, private authClient: AuthService) { 
    this.IsLogged$ = this.authClient.IsLoggedIn$.asObservable();
    this.DoesFollow$ = new BehaviorSubject<boolean>(false);
    this.IsDisabled = false;
  }

  ngOnInit(): void {
    this.authClient.HasFollowed(this.Story?._id!).subscribe((v)=>{
      this.DoesFollow$.next(v);
    })
  }

  Follow(targetId: string){
    //Als een gebruiker al de andere gebruiker heeft gevolgd, voer de onvolg functie uit.
    console.log(`Gebruiker storyId: ${targetId}`);
    this.IsDisabled = true;
    //OnVolg een verhaal als DoesFollow$ true is
    console.log(`Volgt? ${this.DoesFollow$.getValue()}`);
    if(this.DoesFollow$.getValue()){
      console.log('Ontvolgt een verhaal');
      this.rcd.UnFollowStory(targetId)
      .then((observed)=>{
        const o = observed.subscribe((v)=>{
          this.DoesFollow$.next(false);
          this.IsDisabled = !this.IsDisabled;
          const u = this.authClient.RefreshUser().subscribe(()=> u.unsubscribe());
          o.unsubscribe();
        })
      })
      .catch((error)=>{
        console.warn(error)
        console.log("Fout met de involg functie");
      })
    }
    //Volg een verhaal als DoesFollow$ false is
    else
    {
      console.log('Volgt een verhaal');
      this.rcd.FollowStory(targetId)
      .then((observed)=>{
        const obs = observed.subscribe((v)=>{
          console.log(v);
          this.DoesFollow$.next(true);
          this.IsDisabled = !this.IsDisabled;
          const u = this.authClient.RefreshUser().subscribe(()=> u.unsubscribe())
          obs.unsubscribe();
        })
      }).catch((error)=>{
        console.warn(error)
        console.log("Fout met het systeem. ")
      })
    }
    
  }

}
