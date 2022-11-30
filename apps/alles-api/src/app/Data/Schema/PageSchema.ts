import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IChapter, IntfPage } from "data";
import { HydratedDocument } from "mongoose";
import { v4 as uuid } from 'uuid';

export type PageDocument = HydratedDocument<Page>;
export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter implements IChapter{
    
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
    
    //Page array

    /*@Prop({default:[]})
    ComicPages!: Page[];*/
}


@Schema()
export class Page implements IntfPage{

    @Prop({default:uuid})
    PageId!: string;

    @Prop({required: true})
    ChapterId!: string

    @Prop({default: 0})
    PageNr!: number;

    @Prop({required: true})
    ComicImage!: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
export const PageSchema = SchemaFactory.createForClass(Page);