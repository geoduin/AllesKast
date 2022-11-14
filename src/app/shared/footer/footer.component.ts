import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy, OnChanges {

  constructor() { }
  ngOnDestroy(): void {
    console.log("Footer Destroyed");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Footer Changed");
  }

  ngOnInit(): void {
    console.log("Footer loaded");
  }

}
