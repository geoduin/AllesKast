import { Component, Input, OnInit } from '@angular/core';
import { IChapter } from '../../../../../../../libs/data/src';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor() {}

  @Input()
  ChapterList: IChapter | undefined

  ngOnInit(): void {}
}
