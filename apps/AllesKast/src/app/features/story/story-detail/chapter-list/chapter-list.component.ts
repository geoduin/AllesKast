import { Component, Input, OnInit } from '@angular/core';
import { Story } from '../../../domain/Story.domain';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input()
  Story: Story | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
