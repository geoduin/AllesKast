import { Injectable } from "@nestjs/common";
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChapterDetails, ComicPage, IChapter, IntfPage } from "data";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from 'uuid';

export type PageDocument = HydratedDocument<Page>;
export type ChapterDocument = HydratedDocument<Chapter>;
@Schema()
export class Page implements ComicPage{

    @Prop({type: String, default:uuid})
    PageId!: string;

    @Prop({type: String,required: true})
    ImageName!: string;

    @Prop({type: String,required: true})
    ComicImage!: string;
}
export const PageSchema = SchemaFactory.createForClass(Page);

@Schema()
export class Chapter implements ChapterDetails{
    
    @Prop({type: String,required:true})
    StoryId!:string;

    @Prop({type: String,default:uuid, index: true})
    ChapterId!: string;

    @Prop({type: String,required:true})
    ChapterTitle!: string;

    @Prop({type: Date, default: new Date})
    PublishDate!: Date;

    @Prop({type: Number, default: 1})
    ChapterNr!: number;

    @Prop({type: Object})
    Ratings!: [{ UserId: string; Rating: number; }];
    
    @Prop({type: Page})
    ChapterPage!: Page

    //@Prop({type: Page[], default: []})
    //ChapterPages!: Page[]
}





export const ChapterSchema = SchemaFactory.createForClass(Chapter);
