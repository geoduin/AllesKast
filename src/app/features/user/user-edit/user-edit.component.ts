import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DummyDB } from 'src/app/services/DummyDb';
import { IdentityUser} from '../../domain/User.domain';

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

  IsEdit:boolean = true;
  constructor(private router: ActivatedRoute, private Db: DummyDB, private nav: Router) { }
  
  ngOnInit(): void {
    //Loads in user to edit
    this.router.paramMap.subscribe((url)=>{
      const UserId = url.get("UserId");
      //If UserId is present, it will act as 
      if(UserId){
        console.log("User is to be edited")
        //Sets user on editable
        this.IsEdit = true;
        //Check if user does not edit if it closes the form
        const retrievedUser = this.Db.FindOneUser(UserId);
        let StringedUser = JSON.stringify(retrievedUser);
        //Creates deep copy of user.
        this.User = JSON.parse(StringedUser);
        this.Pagina = "Wijziging gegevens van " + this.User?.UserName;
      } else{
        //Otherwise it will receive the registration form
        //Sets user on non-editable. Is used to differiate with the edit url. 
        this.IsEdit = false;
        const randomId = (Math.random() * 100) - 12;
        this.Pagina = "Registratieformulier"
        this.User = {
          Id: randomId.toLocaleString(),
          UserName: "",
          DateOfBirth: new Date(),
          Role: "Regular",
          Email: "",
          Password: ""
        }
      }
    })

  }

  //Aangeroepen methode bij het drukken van de knop.
  onSubmit() {
    
    if(this.IsEdit){
      this.EditUser();
      this.nav.navigate([".."]);
    } else{
      this.RegisterUser();
      this.nav.navigate([".."]);
    }
    //If it is a edit page, edit user and move on to own page.
    console.log(this.User);
  }
  //Voegt gebruiker toe aan database.
  RegisterUser(){
    try {
      this.Db.AddUser(this.User!);
      console.log("Registratie voltooid");
    } catch (error) {
      console.error(error);
    }
  }

  //Wijzigt gebruiker
  EditUser(){
    try {
      //Update commando naar de api.
      this.Db.UpdateUser(this.User!);
      console.log("Wijziging voltooid");
    } catch (error) {
      //Fail save als het toch een null waarde meestuurt.
      console.error(error);
    }
    
  }
}
