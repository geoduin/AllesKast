import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { map } from 'rxjs';
import { ChapterDetails, ChapterPage, IChapter, IntfPage } from '../../../../../../../libs/data/src';
import { ChapterClient } from '../../../../../../../libs/services/src';
import { DialogComponent } from '../../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {
  PageHolder: Map<string, any> = new Map();
  PageList: any[] = [];
  //To hold all pages.
  ChapterForm: ChapterDetails;
  Warning: string;
  Edit: boolean;
  EditCreate: string;
  DisAble: boolean;
  
  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private ChapterClient: ChapterClient) { 
    this.Warning = "";
    this.DisAble = false;
    this.Edit = false;
    this.EditCreate = "aanmaken van hoofdstuk";
    this.ChapterForm = {
      StoryId: "",
      ChapterTitle: "",
      ChapterId: undefined,
      ChapterNr: 0,
      PublishDate: new Date(),
      Ratings: undefined,
      ChapterPage:{
        ComicImage: "",
        ImageName: "",
        PageId: undefined,
      }
    }
  }

  DeleteImage(key: number){

  }

  PublishImage(event:any){
    console.log("Afbeelding proberen");
    console.log('onSelectFile')
    if (event.target.files && event.target.files[0]) {
      const imageFile: File = event.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.dir(event.target.files[0])
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // set the image value to the Base64 string -> can be saved in dtb
        const image = reader.result as string;
        console.log("Length van afbeeldinge")
        console.log(image.length);
        this.ChapterForm.ChapterPage = {
          ImageName: imageFile.name,
          ComicImage: image,
          PageId: undefined,
        }
        this.PageHolder.set( imageFile.name ,{ImageName: imageFile.name, ComicImage: image,});
        this.PageList.push({ImageName: imageFile.name, ComicImage: image,})
      }

      //Loading bar when busy
    }
  }

  ngOnInit(): void {
    console.log("Hoofdstuk wijziging in process");
    this.route.paramMap.subscribe((urlWaarden)=>{
      //StoryId pakken
      const StoryId = urlWaarden.get("StoryId");
      const ChapterId = urlWaarden.get("ChapterId");
      
      //Als er een storyID aanwezig is, Controleer of er een edit url aanwezig is.
      //Niet, maak een nieuwe hoofdstuk aan, anders vul in de rest ter wijziging.
      if(StoryId && ChapterId){
        console.log("Edit gevonden");
        this.ChapterForm.StoryId = StoryId;
        //Zoek naar huidige hoofdstuk.
        this.ChapterClient.Get(StoryId, ChapterId,{})
        .subscribe((v)=>{
          if(v.result){
            console.log(v.result);
            this.Edit = !this.Edit;
            this.EditCreate = "Wijziging van hoofdstuk"
            this.ChapterForm = v.result;
          } else{
            this.router.navigate(["/"]);
            console.log("Fout: niet gevonden");
          }
          
        })
      } else if(StoryId){
        this.ChapterForm.StoryId = StoryId;
      } else{
        console.log("Foute url input");
        this.router.navigate(["/"]);
      }
    })
  }

  OnSubmit(){
    this.Edit ? this.Update(this.ChapterForm) : this.Create(this.ChapterForm) ;
  }

  Create(form: ChapterDetails){
    this.dialog.open(DialogComponent, {data:{naam: this.EditCreate} }).afterClosed().subscribe((value)=>{
      
      if(value){
        //Als de afbeelding groter is dan 2 MB, dan wordt de hoofdstuk niet aangemaakt.
        this.Warning = "Laden";
        this.DisAble = true;
        this.ChapterClient
        .Create(form.StoryId, form, {}).subscribe(()=>{
          this.DisAble = false;
          this.Warning = "";
          this.router.navigate(["/"]);
          console.log("Een nieuw hoofdstuk is geplaatst.")
        })
        
      } else{
        console.log("Niets");
      }
    })
  }

  Update(form: ChapterDetails){
    this.dialog.open(DialogComponent, {data:{naam: this.EditCreate}}).afterClosed().subscribe((value)=>{
      if(value){
        this.DisAble = true;
        this.Warning = "";
        this.ChapterClient.Update(form.StoryId, form.ChapterId!, form, {}).subscribe((value)=>{
          console.log(value);
          this.DisAble = false;
          this.Warning = "";
          this.router.navigate(["/"]);
        })
      }
    })
  }
}
