import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoryDetail } from '../../../../../../../libs/data/src';
import { AuthService, UserClient, StoryClient } from '../../../../../../../libs/services/src';

@Component({
  selector: 'app-writtenlist',
  templateUrl: './writtenlist.component.html',
  styleUrls: ['./writtenlist.component.css'],
})
export class WrittenlistComponent implements OnInit {

  Warning: boolean;
  StoryList$: BehaviorSubject<StoryDetail[]>;

  constructor(private authService: AuthService, private userService: UserClient, private storyClient: StoryClient) {
    this.StoryList$ = new BehaviorSubject<StoryDetail[]>([]);
    this.Warning = false;
  }

  ngOnInit(): void {
    this.storyClient.GetOwn().subscribe((v: any)=>{
      console.log(v);
      if(v.length == 0){
        this.Warning = true;
      } else{
        this.Warning = false;
        this.StoryList$.next(v);
        console.log(this.StoryList$);
      }
    })
  }
}
