import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DummyDB } from 'src/app/services/DummyDb';
import { User } from '../../domain/User.domain';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  user: User | undefined;
  
  constructor(private router: ActivatedRoute, private Db: DummyDB) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params)=>{
      const Userid = params.get("UserId")
      console.log(Userid);
      this.user = this.Db.GetAllDummyUsers().filter(u => u.Id == Userid)[0];
    })
  }

}
