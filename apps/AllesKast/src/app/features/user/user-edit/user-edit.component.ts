import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { EditUserVM, IdentityUser } from '../../../../../../../libs/data/src';
import { AuthService, UserClient } from '../../../../../../../libs/services/src';
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
  User: EditUserVM | undefined; 
  IsEdit:boolean = true;

  Warning: string;
  constructor(
    private router: ActivatedRoute, 
    private nav: Router, 
    private userClient: UserClient,
    private authService: AuthService) { 
      this.Warning = "";
    }
  
  ngOnInit(): void {
    //Loads in user to edit
    this.router.paramMap.subscribe((url)=>{
      const UserId = url.get("UserId");
      //If UserId is present, it will act as 
      if(UserId){
        //Sets user on editable
        this.IsEdit = true;
        //Check if user does not edit if it closes the form
        this.Pagina = "Wijziging gegevens van " + this.User?.UserName;
        this.userClient.GetOne(UserId).subscribe((u)=>{
          this.User = {
            ...u,
            PasswordConfirmation: "",
            EditPassword: true
          };
          this.Pagina = "Wijziging gegevens van " + this.User?.UserName;
        });
      } else{
        //Otherwise it will receive the registration form
        //Sets user on non-editable. Is used to differiate with the edit url. 
        this.IsEdit = false;
        this.Pagina = "Registratieformulier"

        //Will be removed when interacting with a api.
        this.User = {
          _id: undefined,
          UserName: "",
          DateOfBirth: new Date(),
          Role: "Student",
          Email: "",
          Password: "",
          PasswordConfirmation: "",
          EditPassword: false
        }
      }
    })

  }

  //Aangeroepen methode bij het drukken van de knop.
  onSubmit() {
    console.log()
    if(this.IsEdit){
      this.EditUser();
      this.nav.navigate([".."]);
    } else{
      this.RegisterUser();
    }
    //If it is a edit page, edit user and move on to own page.
    console.log(this.User);
  }
  //Voegt gebruiker toe aan database.
  async RegisterUser(){
    try {
      this.userClient.CreateOne(this.User!)
      .pipe(
        map((result) => {
          console.log(result);
          const res = result as unknown as any;
          if(res.message == "User creation failed"){
            this.Warning = "Foute input gegeven";
            return;
          } else{
            console.log("Registratie voltooid");
            this.nav.navigate([".."]);
          }
          
        }),
        catchError((error) => {
          throw error;
        })
      ).subscribe();
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
