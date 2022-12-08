import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { GenreList, IStory, PrivateUser, StoryDetail, Writer } from '../../../../../../../libs/data/src';
import { AuthService, StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';


@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})
export class StoryEditComponent implements OnInit {
  GenreList = GenreList;
  IsEdit = false;
  Sign:string | null | undefined;
  NewStory!: IStory;
  Titel: string
  Warning: string = "";
  IsDis = false;
  constructor(
    private route: ActivatedRoute, 
    private Router: Router, 
    private client: StoryClient,
    private authService: AuthService) { 
    this.Titel = "";
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      this.Sign = param.get("StoryId");
      //If storyid is present. It will fill the form with editable data.
      if(this.Sign){
        //Database command to retrieve data from database;
        this.Titel = "Wijziging van verhaal";
        this.IsEdit = true;
        this.client.GetOne(this.Sign, {}).subscribe((story)=>{
          if(story){
            this.NewStory = story;
          } else{
            console.log("Verhaal is niet gevonden");
            this.Router.navigate([".."]);
          }
        });
      } else{
        //Otherwise it will fill in a new form
        const OwnWriter:Writer = this.authService.GetDirectUser() as Writer;
        this.Titel = "Verhaal aanmaakpagina";
        this.IsEdit = false
        this.NewStory = {
          _id: undefined,
          StoryId: undefined,
          Title: "",
          PublishDate: new Date(),
          StoryLine: "",
          Genres: "",
          Writer: OwnWriter,
          IsAdultOnly: false,
          Thumbnail: undefined,
        }
        
      }
    })
  }

  onSelectFile(event:any) {
    console.log('onSelectFile')
    if (event.target.files && event.target.files[0]) {
      const imageFile: File = event.target.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      //console.dir(event.target.files[0])
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // set the image value to the Base64 string -> can be saved in dtb
        const image = reader.result as string;
        console.log("Length van afbeeldinge")
        console.log(image.length);
        this.NewStory.Thumbnail = {
          ImageName: imageFile.name,
          Base64Image: image
        }
      }
    }
  }

  OnSubmit():void{
    	try {
          if(this.NewStory.Thumbnail == undefined){
            this.Warning = "Afbeelding moet geupload zijn";
            return;
            //Bestands grootte zal gelimiteerd moeten worden. op 1MB
          } else if(this.NewStory.Thumbnail.Base64Image.length > 5000000){
            this.Warning = "Afbeelding is te groot. Afbeelding mag maximaal 5 MB groot zijn.";
            return;
          }
          //Wijzigt of voegt verhaal
          this.IsEdit ? this.UpdateStory() :this.AddStory();
      } catch (error) {
        this.Router.navigate([".."]);
      }
  }


  UpdateStory(): void{
    //Wijzigt verhaal, exclusief hoofdstukken.
    this.IsDis = true;
    this.client.UpdateOne(this.NewStory.StoryId!, this.NewStory as StoryDetail, {})
    .subscribe(()=>{
      console.log("Verhaal wijzigen");
      this.IsDis = false;
      this.Router.navigate([".."]);
      
    });
  }

  AddStory(): void{
    this.client.CreateOne(this.NewStory as StoryDetail, {})
            .subscribe((value)=>{
              console.log("Nieuwe verhaal aanmaken.");
              this.Router.navigate([".."]);
            });
  }
}
