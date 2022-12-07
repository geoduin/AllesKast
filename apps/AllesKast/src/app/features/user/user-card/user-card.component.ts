import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GUser, IdentityUser, PrivateUser, SiteUser } from '../../../../../../../libs/data/src';
import { AuthService, RecommendedClient } from '../../../../../../../libs/services/src';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  User: GUser | undefined
  
  //Attribuut om te controleren of the knop beschikbaar is.
  //Wordt gebruikt als de gebruiker niet is ingelogd of als laadt functie.
  IsDisabled: boolean;
  IsFollowed: boolean;
  LoggedIn$: Observable<boolean>;
  
  constructor(private Auth: AuthService, private rcd: RecommendedClient) { 
    this.IsFollowed = false;
    this.IsDisabled = false;
    this.LoggedIn$ = new BehaviorSubject(false);
  }

  ngOnInit(): void {
    this.LoggedIn$ = this.Auth.IsLoggedIn$.asObservable();
    this.Auth.HasFollowed(this.User?._id!).subscribe((res)=>{
    this.IsFollowed = res;
   });
  }

  Follow(targetId: string){
    //Als een gebruiker al de andere gebruiker heeft gevolgd, voer de onvolg functie uit.
    this.IsDisabled = true;
    if(this.IsFollowed){
      this.rcd.UnFollowUser(targetId)
      .then((v)=>{
        const o = v.subscribe((v)=>{
          this.IsFollowed = false;
          this.IsDisabled = !this.IsDisabled;
          o.unsubscribe();
          const u = this.Auth.RefreshUser().subscribe(()=> u.unsubscribe());
        })
      })
      .catch((error)=>{
        console.warn(error)
        console.log("Fout met de involg functie");
      })
    }else{
      this.rcd.FollowUser(targetId)
      .then((observed)=>{
        const obs = observed.subscribe((v)=>{
          console.log(v);
          this.IsFollowed = v;
          this.IsDisabled = !this.IsDisabled;
          const u = this.Auth.RefreshUser().subscribe(()=> u.unsubscribe())
          obs.unsubscribe();
        })
      }).catch((error)=>{
        console.warn(error)
        console.log("Fout met het systeem. ")
      })
    }
    
  }

}
