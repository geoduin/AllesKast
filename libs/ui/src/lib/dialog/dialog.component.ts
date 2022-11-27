import { Component, Inject, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent  {
  
  @Output()
  Event : EventEmitter | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {naam: string}) {}
  
  
}
