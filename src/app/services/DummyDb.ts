import { Injectable } from "@angular/core";
import { Chapter } from "../features/domain/Chapter.domain";
import { ChapterPage } from "../features/domain/ChapterPage.domain";
import { Reaction } from "../features/domain/Comment.domain";
import { IStory, Story } from "../features/domain/Story.domain";
import { IdentityUser, IUser, SiteUser, User } from "../features/domain/User.domain";

@Injectable()
export class DummyDB{

    UserArray: IdentityUser[] = [
        {
            Id: "1234",
            UserName: "Generiek1",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
        {
            Id: "1236",
            UserName: "Generiek2",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },

        {
            Id: "1238",
            UserName: "Generiek3",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
        {
            Id: "1250",
            UserName: "Generiek4",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },

        {
            Id: "1260",
            UserName: "Generiek5",
            DateOfBirth: new Date(),
            Email: "Generiek@Example.com",
            Role:  "Student",
            Password: undefined
        },
    ]

    StoryArray: IStory[] = [
        {
            Id: "001",
            Title: "Rode liefde",
            StoryLine: 'Een wereld waarin een koppel de strijd met elkaar aangaan, met als dat 1 van hen zijn liefde toegeeft.',
            Writer: this.UserArray[1] as User,
            IsAdultOnly: false,
            Genres: ["Romantiek"],
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0]as unknown as SiteUser, this.UserArray[2] as unknown as SiteUser]
        },
        {
            Id: "003",
            Title: "Stilte aan de waal",
            StoryLine: 'Water, land en 1 miljoen euro staat op het spel tijdens een wedstrijd, waarin 100 studenten proberen een brug te veroveren. \nEchter kan er maar 1 iemand het spel winnen. Plus het is niet mogelijk om er levend uit te komen.\nWie zal er het laatst staan, wie breekt de stilte van de Maas?',
            Writer: this.UserArray[1] as User,
            IsAdultOnly: true,
            Genres: ["Actie"],
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0] as unknown as SiteUser, this.UserArray[2] as unknown as SiteUser]
        },
        {
            Id: "004",
            Title: "De sleutel tot waanzin",
            StoryLine: 'Drie jaar geleden, verloor de familie de Wit zijn overgrootvader. Na zijn dood, liet hij een groot erfenis achter, inclusief een speciaal soort sleutel. \nHet sleutel bezit een vreemde aura, waarmee gebruikers vervloekt raken en tot waanzin komen. \nNiemand weet wat de oorzaak is, maar volgens overgrootvader is dit wel te voorkomen.\n Hoe zal de familie hiermee omgaan?',
            Writer: this.UserArray[1] as User,
            IsAdultOnly: false,
            Genres: ["Mysterie"],
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],           
            Followers: [this.UserArray[0]as unknown as SiteUser, this.UserArray[2] as unknown as SiteUser]
        }
        ,
        {
            Id: "005",
            Title: "Stilte aan de Rijn",
            StoryLine: 'Vijf jaar voordat de Stilte aan de waal begon, organiseerde Ellen, Rick en Hammilton een toernooi om de lokale gemeenschap bijeen te halen. In de eerste instantie was dit een ordinaire activiteit vol met pret en gezelligheid, maar dringende omstandigheden in Nederland, krimpte het aantal mensen die hieraan meededen. \nZelfzuchtigheid, Dood en verraad, veranderde de stilte van Rijn in een afgrijselijk lawaai.\nWat was er aan de hand',
            Writer: this.UserArray[1] as User,
            IsAdultOnly: true,
            Genres: ["Romantiek"],
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0] as unknown as SiteUser, this.UserArray[2] as unknown as SiteUser]
        }
        ,{
            Id: "006",
            Title: "Druppel",
            StoryLine: '3 lepels water, een emmer en een persoon. Dit is een instructie strip om te laten zien hoe je drinkt',
            Writer: this.UserArray[4] as User,
            IsAdultOnly: false,
            Genres: ["Non-Fictie"],
            PublishDate: new Date(),
            ChapterList: this.GenerateChaptersWithPages(),
            CommentSection: [new Reaction("001", "0","Title", "First"), new Reaction("001", "0", "Title","Second"), new Reaction("001", "0","Title", "Third"), new Reaction("001", "0","Title", "Last reaction"), new Reaction("001", "0", "Title","Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum")],
            Followers: [this.UserArray[0] as unknown as SiteUser, this.UserArray[2] as unknown as SiteUser]
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
        return this.StoryArray as Story[];
    }

    GetAdmin(){
        const admin = new User('Admin', new Date(), "Wachtwoord", 'Admin@example.com');
        admin.Id = '00-001';
        return admin;
    }

    FindOneStory(id: string):Story{
        return this.GetAllStories().filter(s => s.Id == id)[0] as Story;
    }

    FindOneUser(id: string): IdentityUser{
        return this.GetAllDummyUsers().filter(u => u.Id == id)[0];
    }

    AddUser(user: IdentityUser){
        this.UserArray.push(user);
    }

    UpdateUser(user: IdentityUser){
        let CurrentUser:IdentityUser = this.FindOneUser(user.Id!);
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
            this.UserArray = this.UserArray.filter(u => u.Id != userId);
        } catch(error: any){
            throw new Error(error);
        }
    }
}