import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  imagePath!: string;
  Data: TestCase[] = [{
    Userstory:"Als gebruiker wil ik de mogelijkheid hebben om een nieuwe verhaal te publiceren, waarmee lezers het verhaal kan lezen.",
    Acceptatiecriteria:"1. Een gebruiker kan een nieuwe verhaal aanmaken, wijzigen of verwijderen.\n2. Een gebruiker kan alleen zijn eigen verhaal wijzigen of verwijderen\n3. Een gebruiker zal een verhaal kunnen bekijken"
    ,Testmethode: "Cypress en Jest voor de e2e-testen en unit testen."
    },
    {
      Userstory:"Als gebruiker wil ik voor een verhaal een nieuw hoofdstuk plaatsen, zodat andere gebruikers dit hoofdstuk kunnen lezen.",
      Acceptatiecriteria:"1. Een gebruiker kan voor zijn verhaal hoofdstukken aanmaken, wijzigen of verwijderen.\n2. Een gebruiker kan alleen zijn eigen hoofdstukken wijzigen of verwijderen."
    ,Testmethode: "Cypress en Jest voor de e2e-testen en unit testen."
    },
    {
      Userstory:"Als gebruiker wil ik andere gebruikers volgen, zodat ik weet wat zij lezen.",
      Acceptatiecriteria:"1. Een gebruiker kan op andere gebruikers volgen.\n",
      Testmethode: "Via e2e testen in Cypress"
    },
    {
      Userstory:"Op basis van de leeslijst van mijn gevolgde gebruikers, wil ik graag een lijst van nieuwe aanbevelingen willen ontvangen, zodat ik de applicatie mij verhalen kan aanbieden die ik leuk vind.",
      Acceptatiecriteria:"1. Een gebruiker krijgt een lijst van nog niet gevolgde verhalen te zien.",
      Testmethode: "Cypress voor de e2e-testen"
    },
    {
      Userstory:"Als gebruiker wil ik een opmerking kunnen plaatsen, zodat andere mensen weten wat ik ervan vindt.",
      Acceptatiecriteria:"1. Een gebruiker kan op een verhaal een opmerking plaatsen.\n2. Een gebruiker kan alleen zijn eigen opmerkingen wijzigen of verwijderen."
    ,Testmethode: "Cypress en Jest voor de e2e-testen en unit testen."
    },
    {
      Userstory:"Als gebruiker wil ik een verhaal kunnen volgen, zodat ik de nieuwste hoofdstukken van het verhaal niet mis.",
      Acceptatiecriteria:"1. Een gebruiker kan verhalen volgen.",
      Testmethode: "Via e2e testen in Cypress"
    },
    {
      Userstory:"Als gebruiker wil ik voor ieder hoofdstuk een cijfer geven, zodat men weet wat ik van het hoofdstuk vond.",
      Acceptatiecriteria:"1. Een gebruiker kan een cijfer achterlaten op een hoofdstuk.\n2. Een gebruiker kan maar 1 cijfer per hoofdstuk achterlaten.",
      Testmethode: "Unit-testen met Jest."
    }
  ]
  constructor() { 
  }

  ngOnInit(): void {
    this.imagePath = "./staticImages/ERD.png"
  }

}

export interface TestCase{
  Userstory: string
  Acceptatiecriteria: string
  Testmethode: string
}


