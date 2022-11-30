import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { GUser, IChapter, IComment, IStory, Reaction, SiteUser, Writer, ImageHolder, Image, ComicPage} from "data";
import { User } from './UserSchema';
import { Chapter, ChapterSchema } from './PageSchema';

export type StoryDocument = HydratedDocument<Story>;
//export type ChapterDocument = HydratedDocument<Chapter>;
export type CommentSchema = HydratedDocument<Comments>;

//Parent entity
@Schema()
export class Story implements IStory{
    
    
    @Prop({default: uuid, index: true})
    StoryId!: string;

    @Prop({required: true, index: true})
    Title!: string

    @Prop({required: true})
    StoryLine!: string
    
    @Prop({required: true, type: Writer})
    Writer!: Writer

    @Prop({required: true, default: true})
    IsAdultOnly!: boolean

    @Prop({required: true})
    Genres!: string
    
    @Prop({default: new Date()})
    PublishDate!: Date

    @Prop({required: true, type: Image})
    Thumbnail!: Image
    
    @Prop({default: []})
    Comments!: Reaction[]

    ChapterList!: Chapter[] | undefined
}
//Child and embedded object within story
@Schema()
export class Comments implements IComment{
    

    @Prop({required: true})
    StoryId!: string;
    
    @Prop({required: true})
    UserId!: string;
    
    @Prop({required: true})
    Content!: string;
    
    @Prop({default: new Date()})
    PublishDate!: Date;
    
    @Prop({required: true})
    Title!: string;

}
//export const ChapterSchema = SchemaFactory.createForClass(Chapter);
export const StorySchema = SchemaFactory.createForClass(Story);

StorySchema.path('ChapterList') as MongooseSchema.Types.DocumentArray;
//registerStorySchema(StoryChapterArraySchema);
export const CommentsSchema = SchemaFactory.createForClass(Comments);

