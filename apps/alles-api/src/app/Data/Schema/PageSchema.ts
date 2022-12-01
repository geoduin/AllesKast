import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChapterDetails, ComicPage, IChapter, IntfPage } from "data";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from 'uuid';

export type PageDocument = HydratedDocument<Page>;
export type ChapterDocument = HydratedDocument<Chapter>;
@Schema()
export class Page implements ComicPage{

    @Prop({default:uuid})
    PageId!: string;

    @Prop({required: true})
    ImageName!: string;

    @Prop({required: true})
    ComicImage!: string;
}
export const PageSchema = SchemaFactory.createForClass(Page);

@Schema()
export class Chapter implements ChapterDetails{
    
    @Prop({required:true})
    StoryId!:string;

    @Prop({default:uuid, index: true})
    ChapterId!: string;

    @Prop({required:true})
    ChapterTitle!: string;

    @Prop({default: new Date})
    PublishDate!: Date;

    @Prop({default: 1})
    ChapterNr!: number;

    @Prop()
    Ratings!: [{ UserId: string; Rating: number; }];
    
    @Prop({type: Page})
    ChapterPage!: Page

    //@Prop({type: Page[], default: []})
    //ChapterPages!: Page[]
}




export const ChapterSchema = SchemaFactory.createForClass(Chapter);
