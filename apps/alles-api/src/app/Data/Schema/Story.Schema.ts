import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IChapter, IComment, Reaction} from "data";
import { User } from './UserSchema';

export type StoryDocument = HydratedDocument<Story>;
export type ChapterDocument = HydratedDocument<Chapter>;
export type CommentSchema = HydratedDocument<Comments>;

//Parent entity
@Schema()
export class Story{
    
    @Prop({default: uuid, index: true})
    StoryId!: string;

    @Prop({required: true, index: true})
    Title!: string

    @Prop({required: true})
    Storyline!: string
    
    @Prop({required: true})
    Writer!: User

    @Prop({required: true, default: true})
    IsAdultOnly!: boolean

    @Prop({required: true})
    Genres!: string
    
    @Prop({default: new Date()})
    PublishDate!: Date

    @Prop({default: []})
    Comments!: Reaction[]

    @Prop({default: []})
    ChapterList!: Chapter[]
}

//Child entity of a story chapter array
@Schema()
export class Chapter implements IChapter {
    @Prop({default: uuid, index:true})
    Id!: string

    @Prop({required:true})
    ChapterTitle!: string

    @Prop({default: new Date()})
    PublishDate!: Date

    @Prop()
    ChapterNr!: number
    //Array full of references to chapterpage
}

//Child and embedded object within story
@Schema()
export class Comments implements IComment{

    @Prop({required: true})
    ChapterId!: string;
    
    @Prop({required: true})
    UserId!: string;
    
    @Prop({required: true})
    Content!: string;
    
    @Prop({default: new Date()})
    PublishDate!: Date;
    
    @Prop({required: true})
    Title!: string;

}
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
export const StorySchema = SchemaFactory.createForClass(Story);
export const CommentsSchema = SchemaFactory.createForClass(Comments);