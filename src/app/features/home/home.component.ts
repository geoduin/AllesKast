import { Component, OnInit } from '@angular/core';
import { DummyData } from './Dummy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  StoryList:DummyData[] = [new DummyData("Dummy", -1, '', 'Nederland')];
  RecommendedList:DummyData[] = [];
  RecommendedUserList:string[] = [];
  
  
  constructor() { 
    
  }

  ngOnInit(): void {
    var amount = 0;
    while (amount < 8) {
      this.StoryList.push(new DummyData("Dummy", amount, '', 'Nederland'));
      this.RecommendedList.push(new DummyData("Dummy", amount, '', 'Nederland'));
      this.RecommendedUserList.push('Niks');
      amount++;
    }
  }

}
