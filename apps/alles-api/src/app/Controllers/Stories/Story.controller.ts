import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { IdentityUser } from "data";
import * as Jwt from 'jsonwebtoken';
import { ChapterRepository } from "../../Data/Repositories/Chapter.Repository";
import { CommentRepository } from "../../Data/Repositories/Comment.Repository";
import { StoryRepository } from "../../Data/Repositories/Story.Repository";
import { Chapter, Page } from "../../Data/Schema/PageSchema";
import { Comments, Story } from "../../Data/Schema/Story.Schema";
import { User } from "../../Data/Schema/UserSchema";
import { AuthGuard } from "../../Guards/AuthGuard";

@Controller("Stories")
export class StoryController{

    constructor(private repo: StoryRepository, private chapterRepo: ChapterRepository, private commentRepo: CommentRepository){}


    @Get("Self")
    async OwnStories(@Req() request: any){
        const UserId = request["User"];
        console.log(UserId);
        const stories = await this.repo.GetStoryPerUser(UserId.Id);
        return {status: 201, result: stories};
    }

    @Post()
    async CreateStory(@Body() story: Story){
        try {
            console.log("User api creation started");
            console.log(story);
            const answer = await this.repo.Create(story);
            console.log("Story creation ended");
            console.log(answer);
            return {message: "Creation succeeded", result: answer};
        } catch (error:any) {
            return {message: "Creation failed", ErrorMessage: error.message};
        }
       
    }

    @Get()
    async AllStories():Promise<Story[] | unknown>{
        return this.repo.GetAll();
    }

    @Get(":Id")
    async OneStory(@Param('Id') Id: string):Promise<any>{
        try {
            const result = await this.repo.GetOne(Id) as Story[];
            if(result[0]){
                return result[0];
            } else{
                return {message: "User not found"}
            }
            
        } catch (error) {
            return {message: error}
        }
        
    }

    @Put(":Id")
    @UseGuards(AuthGuard)
    async UpdateStory(@Param('Id') Id: string , @Body()story: Partial<Story>):Promise<any>{
        console.log("Update")
        console.log(story);
        try {
            return this.repo.Update(Id, story);
        } catch (error) {
            return {message: "Update failed", Failed: story}
        }
        
    }

    @Delete(":Id")
    @UseGuards(AuthGuard)
    async DeleteStory(@Param("Id") Id: string):Promise<any>{
        const result = await this.repo.Delete(Id)
        return {status: 201, result};
    }

    @Post(":Id/Chapters")
    @UseGuards(AuthGuard)
    async PostChapters(
        @Body("Chapter") Chapters: Chapter, 
        @Body("Pages") Pages: Page[],
        @Body("Page")Page: Page,
        @Param("Id") Id: string){
        console.log(Chapters);
        //Voeg hoofdstuk toe aan verhaal;
        const ChapterCreated = await this.chapterRepo.AddChapterToStory(Id, Chapters);
        console.log("Hoofdstuk is toegevoegd");
        console.log(ChapterCreated);
        return {status: 204, result: ChapterCreated};
    }

    @Delete(":Id/Chapters/:ChapterId")
    @UseGuards(AuthGuard)
    async DeleteChapter(
        @Param("Id") StoryId: string, 
        @Param("ChapterId") ChapterId: string)
        {

        console.log("Deletion of chapter has began");
        //Zoek verhaal op en verwijder hoofdstuk.
        const UpdateResult = await this.chapterRepo.DeleteChapter(StoryId, ChapterId);
        //Geef verhaal terug zonder dat hoofdstuk
        console.log("Deletion of chapter is succesfull deleted");
        return {status: 200, result: UpdateResult};
    }

    @Put(":Id/Chapters/:ChapterId")
    @UseGuards(AuthGuard)
    async UpdateChapter(
        @Param("Id") StoryId: string, 
        @Param("ChapterId") ChapterId: string,
        @Body("Chapter") Chapter: Partial<Chapter>,
        @Body("Pages") Pages: Partial<Page[]>){
            console.log(`Update chapters and pages has succeeded. StoryId: ${StoryId} and ChapterId: ${ChapterId}`);

            //TODO must be converted to a transaction.
            const result1 = await this.chapterRepo.UpdateChapter(StoryId, ChapterId, Chapter);

            //TODO updates multiple pages.
            //const result2 = await this.chapterRepo.UpdatePages(ChapterId, Pages);
            return {status: 201, result: result1};
    }
    
    @Get(":Id/Chapters/:ChapterId")
    async GetChapterPages( 
        @Param("Id") StoryId: string, 
        @Param("ChapterId") ChapterId: string,){
            console.log("Get chapterlist.");
            //Haalt alle paginas van een hoofdstuk op
            const result = await this.chapterRepo.GetChapterPages(StoryId, ChapterId);
            console.log(result);
            return {status: 201, result};
    }

    @Get(":Id/Chapters")
    async AllChaptersOfStory(@Param("Id") StoryId: string, @Query() queryParams: any){

        console.log(queryParams.WantImage);
        const result = await this.chapterRepo.GetAllChapters(StoryId, queryParams.WantImage);
        return {status: 201, result};
    }

    @Post(":Id/Comments")
    @UseGuards(AuthGuard)
    async PostCommentOnStory(@Param("Id") StoryId: string, @Body() comment: Comments){
        console.log(StoryId);
        console.log(comment);

        const result = await this.commentRepo.PostComment(StoryId, comment);
        return { status: 201, result: result};
    }

    @Put(":Id/Comments/:CommentId")
    @UseGuards(AuthGuard)
    async UpdateComment(@Param("Id") StoryId: string,@Param("CommentId") commentId: string, @Body() comment: Comments){
        console.log(StoryId);
        console.log(commentId);

        const result = await this.commentRepo.UpdateComment(StoryId, commentId, comment);
        return { status: 201, result: result};
    }

    @Delete(":Id/Comments/:CommentId")
    @UseGuards(AuthGuard)
    async DeleteComment(@Param("Id") StoryId: string,@Param("CommentId") commentId: string){
        console.log(StoryId);
        console.log(commentId);

        const result = await this.commentRepo.DeleteComment(StoryId, commentId);
        return { status: 201, result: result};
    }

    @Get(":Id/Comments/:CommentId")
    async GetComment(@Param("Id") StoryId: string,@Param("CommentId") commentId: string){
        console.log(StoryId);
        console.log(commentId);

        const result = await this.commentRepo.GetOne(StoryId, commentId);
        return { status: 201, result: result?.Comments[0]};
    }
    //TODO
    //Add, update and delete single page

    @Get(":Id/Comments")
    async AllComments(@Param("Id") StoryId: string){
        console.log(StoryId);

        const list = await this.commentRepo.AllComments(StoryId);
        return { status: 201, result: list?.Comments};
    }
}