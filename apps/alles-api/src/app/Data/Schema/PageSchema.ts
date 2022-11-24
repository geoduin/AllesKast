import { Injectable } from "@nestjs/common";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IntfPage } from "data";
import { HydratedDocument } from "mongoose";

export type PageDocument = HydratedDocument<Page>;

@Injectable()
export class Page implements IntfPage{
    @Prop({required: true})
    StoryId!: string;
    @Prop({required: true})
    ChapterId!: string;

    @Prop()
    PageNr!: number;

    @Prop({required: true})
    ComicImage!: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);