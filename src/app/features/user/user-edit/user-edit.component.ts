import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DummyDB } from 'src/app/services/DummyDb';
import { IUser } from '../../domain/User.domain';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() Editable:boolean = true;
  //For the edit of the user
  Pagina: string = ""

  User: IUser | undefined;

  submitted:boolean = true;
  constructor(private router: ActivatedRoute, private Db: DummyDB) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("Changes made");
  }

  ngOnInit(): void {
    //Loads in user to edit
    this.router.paramMap.subscribe((url)=>{
      const UserId = url.get("UserId");
      if(this.Editable){
        this.User = this.Db.GetAllDummyUsers().filter(v => v.Id == UserId)[0];
        this.Pagina = `Wijziging gegevens van ${this.User.UserName}`
        console.log(this.User);
      } else{
        this.Pagina = "Registratieformulier";
        console.warn("Is een registratie formulier")
      }
    })

  }
  onSubmit() {
    
    console.log("This button works")
    //If it is a edit page, edit user and move on to own page.
    
  }

  RegisterUser(){
    console.log("Registratie voltooid");
  }

  EditUser(){
    console.log("Wijziging voltooid");
  }
}
