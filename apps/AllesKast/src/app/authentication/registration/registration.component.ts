import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentityUser } from '../../../../../../libs/data/src';
import { DummyRepo } from '../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { UserEditComponent } from '../../features/user/user-edit/user-edit.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  
  //For the edit of the user
  constructor() { }

  ngOnInit(): void {
  }
}
