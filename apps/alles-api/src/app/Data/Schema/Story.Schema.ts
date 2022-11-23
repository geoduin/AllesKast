import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Chapter, GUser, IStory, Reaction, StoryDetail} from "data";

export type StoryDocument = HydratedDocument<Story>;

@Schema()
export class Story{
    @Prop({default: uuid, index: true})
    Id: string | undefined

    @Prop({required: true})
    Title: string| undefined

    @Prop({required: true})
    StoryLine: string| undefined

    @Prop({required: true, default: true})
    IsAdultOnly: boolean| undefined

    @Prop({required: true})
    Genres: string| undefined
    
    @Prop()
    PublishDate: Date| undefined

    @Prop()
    Writer: GUser| undefined

    @Prop({default: []})
    Comments: Reaction[] | undefined;

    @Prop({default: []})
    ChapterList: Chapter[] | undefined;
}

export const StorySchema = SchemaFactory.createForClass(Story);