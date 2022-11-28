import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent  {
  
  Titel: string;

  @Output()
  ConfirmationEvent = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {naam: string}) {
    this.Titel = data.naam;
  }

  ConfirmAction(){
    console.log("Dialog bevestigt");
    this.ConfirmationEvent?.emit(false);
    console.log("dialog is bevestigt");
  }
  
  
}
