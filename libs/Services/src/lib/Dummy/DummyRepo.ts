import { Injectable } from "@angular/core";
import { Chapter, ChapterPage, IdentityUser, IStory, Reaction, StoryDetail } from "data";

@Injectable()
export class DummyRepo{

    UserArray: IdentityUser[] = [
        {
            _id: "1234",
            UserName: "Generiek1",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
        {
            _id: "1236",
            UserName: "Generiek2",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },

        {
            _id: "1238",
            UserName: "Generiek3",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
        {
            _id: "1250",
            UserName: "Generiek4",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },

        {
            _id: "1260",
            UserName: "Generiek5",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
    ]

    StoryArray: StoryDetail[] = [
        {
            Id: "001",
            Title: "Rode liefde",
            StoryLine: 'Een wereld waarin een koppel de strijd met elkaar aangaan, met als dat 1 van hen zijn liefde toegeeft.',
            Writer: this.UserArray[1],
            IsAdultOnly: false,
            Genres: "Romantiek",
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0], this.UserArray[2]]
        },
        {
            Id: "003",
            Title: "Stilte aan de waal",
            StoryLine: 'Water, land en 1 miljoen euro staat op het spel tijdens een wedstrijd, waarin 100 studenten proberen een brug te veroveren. \nEchter kan er maar 1 iemand het spel winnen. Plus het is niet mogelijk om er levend uit te komen.\nWie zal er het laatst staan, wie breekt de stilte van de Maas?',
            Writer: this.UserArray[1],
            IsAdultOnly: true,
            Genres: "Actie",
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0], this.UserArray[2]]
        },
        {
            Id: "004",
            Title: "De sleutel tot waanzin",
            StoryLine: 'Drie jaar geleden, verloor de familie de Wit zijn overgrootvader. Na zijn dood, liet hij een groot erfenis achter, inclusief een speciaal soort sleutel. \nHet sleutel bezit een vreemde aura, waarmee gebruikers vervloekt raken en tot waanzin komen. \nNiemand weet wat de oorzaak is, maar volgens overgrootvader is dit wel te voorkomen.\n Hoe zal de familie hiermee omgaan?',
            Writer: this.UserArray[1],
            IsAdultOnly: false,
            Genres: "Mysterie",
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],           
            Followers: [this.UserArray[0], this.UserArray[2]]
        }
        ,
        {
            Id: "005",
            Title: "Stilte aan de Rijn",
            StoryLine: 'Vijf jaar voordat de Stilte aan de waal begon, organiseerde Ellen, Rick en Hammilton een toernooi om de lokale gemeenschap bijeen te halen. In de eerste instantie was dit een ordinaire activiteit vol met pret en gezelligheid, maar dringende omstandigheden in Nederland, krimpte het aantal mensen die hieraan meededen. \nZelfzuchtigheid, Dood en verraad, veranderde de stilte van Rijn in een afgrijselijk lawaai.\nWat was er aan de hand',
            Writer: this.UserArray[1],
            IsAdultOnly: true,
            Genres: "Romantiek",
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0], this.UserArray[2]]
        }
        ,{
            Id: "006",
            Title: "Druppel",
            StoryLine: '3 lepels water, een emmer en een persoon. Dit is een instructie strip om te laten zien hoe je drinkt',
            Writer: this.UserArray[4],
            IsAdultOnly: false,
            Genres: "Non-Fictie",
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0], this.UserArray[2]]
        }
    ]


    GenerateChaptersWithPages(){
        const Lijst: Chapter[] = [];

        for (let index = 0; index < 5; index++) {
            const Hoofdstuk = new Chapter(`Generieke hoofdstuktitel`, index)
            //Voegt vijf paginas toe per hoofdstuk.
            Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
            Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
            Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
            Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
            Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
            Lijst.push(Hoofdstuk);
        }
        return Lijst;
    }

    GetAllDummyUsers(){
        return this.UserArray as IdentityUser[];
    }

    GetAllStories(){
        return this.StoryArray;
    }
    FindOneStory(id: string):StoryDetail{
        return this.GetAllStories().filter(s => s.Id == id)[0];
    }

    FindOneUser(id: string): IdentityUser{
        return this.GetAllDummyUsers().filter(u => u._id == id)[0];
    }

    AddUser(user: IdentityUser){
        this.UserArray.push(user);
    }

    UpdateUser(user: IdentityUser){
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-non-null-assertion
        let CurrentUser:IdentityUser = this.FindOneUser(user._id!);
        if(CurrentUser){
            //Updates user if user is found
            CurrentUser.UserName = user?.UserName;
            CurrentUser.Password = user?.Password;
            CurrentUser.DateOfBirth =user?.DateOfBirth;
            CurrentUser.Email = user?.Email;
            
            //Update commando naar de API!

        } else{
            console.warn("User update has failed");
        }
    }

    DeleteUser(userId: string){
        try{
            this.UserArray = this.UserArray.filter(u => u._id != userId);
        } catch(error: any){
            throw new Error(error);
        }
    }

    AddStory(User: IStory){
        this.StoryArray.push(User as StoryDetail);
    }

    Update(User:IStory){
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, prefer-const
            let FoundUser = this.FindOneStory(User.Id!);
            FoundUser.Title = User.Title;
            FoundUser.Genres = User.Genres;
            FoundUser.StoryLine = User.StoryLine;
            FoundUser.IsAdultOnly = User.IsAdultOnly;
        } catch (error) {
            console.log("Wijziging mislukt");
        }
    }

    Delete(id: string){
        try {
            this.StoryArray = this.StoryArray.filter(s => s.Id != id);
        } catch (error) {
            throw new Error();
        }
    }
}