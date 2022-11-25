import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { EditUserVM, IdentityUser } from '../../../../../../../libs/data/src';
import { UserClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  TempID: number = 1
  //For the edit of the user
  Pagina: string = ""
  //user
  User: IdentityUser | undefined | null;
  EditVM : EditUserVM | undefined;
  IsEdit:boolean = true;
  constructor(private router: ActivatedRoute, private Db: DummyRepo, private nav: Router, private userClient: UserClient) { }
  
  ngOnInit(): void {
    //Loads in user to edit
    this.router.paramMap.subscribe((url)=>{
      const UserId = url.get("UserId");
      //If UserId is present, it will act as 
      if(UserId){
        //Sets user on editable
        this.IsEdit = true;
        //Check if user does not edit if it closes the form
        this.userClient.GetOne(UserId).subscribe((u)=>{
          this.User = u;
          this.Pagina = "Wijziging gegevens van " + this.User?.UserName;
        });
        
      } else{
        //Otherwise it will receive the registration form
        //Sets user on non-editable. Is used to differiate with the edit url. 
        this.IsEdit = false;
        this.Pagina = "Registratieformulier"
        this.User = {
          _id: "",
          UserName: "",
          DateOfBirth: new Date(),
          Role: "Student",
          Email: "",
          Password: ""
        }
      }
    })

  }

  //Aangeroepen methode bij het drukken van de knop.
  onSubmit() {
    console.log()
    if(this.IsEdit){
      this.EditUser();
      
    } else{
      this.RegisterUser();
      this.nav.navigate([".."]);
    }
    //If it is a edit page, edit user and move on to own page.
    console.log(this.User);
  }
  //Voegt gebruiker toe aan database.
  async RegisterUser(){
    try {
      const a = (await this.userClient.CreateOne({ _id: undefined, UserName: this.User?.UserName, Password: this.User?.Password, Email: this.User?.Email, Role: this.User?.Role, DateOfBirth: this.User?.DateOfBirth })).pipe(
        map((result) => {
          console.log(result);
          this.Db.AddUser(this.User!);
          console.log("Registratie voltooid");
          this.nav.navigate([".."]);
        }),
        catchError((error) => {
          throw error;
        })
      )
      const b = a.subscribe((waarde)=>{console.log(waarde)});
    } catch (error) {
      console.error(error);
    }
  }

  //Wijzigt gebruiker
  EditUser(){
    try {
      //Update commando naar de api.
      this.userClient.UpdateOne(this.User?._id!, this.User as EditUserVM).subscribe((done) => {
        console.log("Wijziging voltooid");
        console.log(done);
        this.nav.navigate([".."]);
      });
    } catch (error) {
      //Fail save als het toch een null waarde meestuurt.
      console.error(error);
    }
    
  }
}
