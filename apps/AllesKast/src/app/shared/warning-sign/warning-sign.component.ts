import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-sign',
  templateUrl: './warning-sign.component.html',
  styleUrls: ['./warning-sign.component.css'],
})
export class WarningSignComponent implements OnInit {
  
  @Input()
  Warning: string;

  constructor() {
    this.Warning = "";
  }

  ngOnInit(): void {}
}
