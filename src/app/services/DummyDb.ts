import { Injectable } from "@angular/core";
import { Chapter } from "../features/domain/Chapter.domain";
import { ChapterPage } from "../features/domain/ChapterPage.domain";
import { Reaction } from "../features/domain/Comment.domain";
import { Story } from "../features/domain/Story.domain";
import { User } from "../features/domain/User.domain";

@Injectable()
export class DummyDB{

    //Dummy data
    Users: User[] = [
        new User('Clover33', new Date(), "C$ws2##C$ws", 'Clover33@example.com'),
        new User('Jennifer', new Date(), "C$wsC$ws2##", 'Jennifer@example.com'),
        new User('OnlineGuy', new Date(), "2##C$w2##s2##2##",'OnlineGuy@example.com'),
        new User('GigaWarrior64', new Date(), "vC$ws2#$ws2##$ws2#", 'GigaWarrior64@example.com'),
        new User('Kees', new Date(), "Wachtwoord", 'Kees@example.com'),
        /* Ids klaarzetten
        new User('123-45', 'Clover33', new Date(), "C$ws2##C$ws", 'Clover33@example.com'),
        new User('123-46','Jennifer', new Date(), "C$wsC$ws2##", 'Jennifer@example.com'),
        new User('123-47','OnlineGuy', new Date(), "2##C$w2##s2##2##",'OnlineGuy@example.com'),
        new User('123-48','GigaWarrior64', new Date(), "vC$ws2#$ws2##$ws2#", 'GigaWarrior64@example.com'),
        new User('123-49','Kees', new Date(), "Wachtwoord", 'Kees@example.com'),
        */ 
    ]

    Stories: Story[] = [
        new Story('Rode liefde', 'Een wereld waarin een koppel de strijd met elkaar aangaan, met als dat 1 van hen zijn liefde toegeeft.', false, new Date()),
        new Story('Stilte aan de waal', 'Water, land en 1 miljoen euro staat op het spel tijdens een wedstrijd, waarin 100 studenten proberen een brug te veroveren. \nEchter kan er maar 1 iemand het spel winnen. Plus het is niet mogelijk om er levend uit te komen.\nWie zal er het laatst staan, wie breekt de stilte van de Maas?', true, new Date()),
        new Story('De sleutel tot waanzin', 'Drie jaar geleden, verloor de familie de Wit zijn overgrootvader. Na zijn dood, liet hij een groot erfenis achter, inclusief een speciaal soort sleutel. \nHet sleutel bezit een vreemde aura, waarmee gebruikers vervloekt raken en tot waanzin komen. \nNiemand weet wat de oorzaak is, maar volgens overgrootvader is dit wel te voorkomen.\n Hoe zal de familie hiermee omgaan?', false, new Date()),
        new Story('Stilte aan de Rijn', 'Vijf jaar voordat de Stilte aan de waal begon, organiseerde Ellen, Rick en Hammilton een toernooi om de lokale gemeenschap bijeen te halen. In de eerste instantie was dit een ordinaire activiteit vol met pret en gezelligheid, maar dringende omstandigheden in Nederland, krimpte het aantal mensen die hieraan meededen. \nZelfzuchtigheid, Dood en verraad, veranderde de stilte van Rijn in een afgrijselijk lawaai.\nWat was er aan de hand', true, new Date()),
        new Story('Druppel', '3 lepels water, een emmer en een persoon. Dit is een instructie strip om te laten zien hoe je drinkt', false, new Date())
    ]

    MakeUsers(){
        for (let index = 0; index < this.Users.length; index++) {
            const User = this.Users[index];
            User.Id = `12-${index}`
        }
        return this.Users;
    }

    MakeStories(){
        for (let index = 0; index < this.Stories.length; index++) {
            const Story = this.Stories[index];
            Story.Id = `08-${index}-9${index}`
            const User = this.Users[index];
            
            Story.Writer = User;
            //Ads comment to story
            for (let ii = 0; ii < 5; ii++) {
                const Comment = new Reaction(Story.Id, User.Id!, "First");
                const Hoofdstuk = new Chapter(`Generieke hoofdstuktitel`, ii)

                //Voegt vijf paginas toe per hoofdstuk.
                Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
                Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
                Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
                Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
                Hoofdstuk.AddPages(new ChapterPage(new ArrayBuffer(0)));
                
                Story.AddComment(Comment);
                Story.AddChapterToStory(Hoofdstuk)
                Story.Followers = this.Users;
            }
        }

        return this.Stories;
    }

    GetAllDummyUsers(){
        return this.MakeUsers();
    }

    GetAllStories(){
        return this.MakeStories();
    }

    GetAdmin(){
        const admin = new User('Admin', new Date(), "Wachtwoord", 'Admin@example.com');
        admin.Id = '00-001';
        return admin;
    }

    FindOneStory(id: string):Story{
        return this.GetAllStories().filter(s => s.Id == id)[0];
    }
}