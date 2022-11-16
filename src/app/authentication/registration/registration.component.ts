import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/features/domain/User.domain';
import { UserEditComponent } from 'src/app/features/user/user-edit/user-edit.component';
import { DummyDB } from 'src/app/services/DummyDb';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnChanges {
  
  //For the edit of the user
  Pagina: string = ""

  User: IUser | undefined;

  submitted = false;
  constructor(private router: ActivatedRoute, private Db: DummyDB) { }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("Changes made");
  }

  ngOnInit(): void {
    //Loads in user to edit
    this.router.paramMap.subscribe((url)=>{
      const UserId = url.get("UserId");
      if(UserId){
        
        this.User = this.Db.GetAllDummyUsers().filter(v => v.Id == UserId)[0];
        this.Pagina = `Wijziging gegevens van ${this.User.UserName}`
        console.log(this.User);
      }else{
        this.Pagina = "Registratieformulier";
        console.warn("Is een registratie formulier")
      }
    })
  }

  onSubmit() {
    console.log("This button works")
    this.submitted = true;
  }
}
