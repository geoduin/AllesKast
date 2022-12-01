import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChapterClient } from '../../../../../../../libs/services/src';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-chapter-delete',
  templateUrl: './chapter-delete.component.html',
  styleUrls: ['./chapter-delete.component.css'],
})
export class ChapterDeleteComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  subDelete: Subscription | undefined;
  @Input()
  StoryId: string | undefined;

  @Input()
  ChapterId: string | undefined;

  constructor(private dialog: MatDialog, private client: ChapterClient, private routert: Router) {}

  ngOnInit(): void {}

  Delete(){
    console.log("Verwijdering in process")
    this.sub =this.dialog.open(DialogComponent, {data:{naam: "verwijdering hoofdstuk"}}).afterClosed().subscribe((v)=>{
      if(v){
        this.subDelete = this.client.Remove(this.StoryId!, this.ChapterId!, {}).subscribe((r)=>{
          console.log(r);
          console.log("Verwijdering in process")
          this.routert.navigate([".."]);
        });
        
      }
    })
  }
  ngOnDestroy(): void {
    console.log("Unsub");
    if(this.sub && this.subDelete){
      this.sub.unsubscribe();
      this.subDelete.unsubscribe();
    }
    
  }
  
}
