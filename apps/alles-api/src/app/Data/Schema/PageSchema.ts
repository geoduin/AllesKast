import { Injectable } from "@nestjs/common";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PageDocument = HydratedDocument<Page>;

@Injectable()
export class Page{
    
    @Prop({required: true})
    ChapterId!: string;

    @Prop({required: true})
    PageNr!:number;

    @Prop({required: true})
    ComicPage!: string
}

export const PageSchema = SchemaFactory.createForClass(Page);