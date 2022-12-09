import { randomUUID } from "crypto";

import mongoose from "mongoose";
import { Chapter } from "../Schema/PageSchema";
import { Comments, Story } from "../Schema/Story.Schema";
import { User } from "../Schema/UserSchema";

export class MockData{
List:User[] = [
    {
        "_id": "639330d92e46f24765012859",
        Id: "1000-1000-1000-1000", 
        UserName: "Mongod", 
        "DateOfBirth": new Date(), 
        "Email": "Mongod@Example", 
        "Password": "$2a$09$Qaj2R2cG082/vZ7JraHEi.iUWnLYghJXCcxBlkgebLRerKXgZd.82", 
        "Role": "REGULAR", 
        "FollowUserlist": [], 
        "StoryFollowedlist": [
            new mongoose.Types.ObjectId("63933237c9d586d6c8fdf1d0"),
            new mongoose.Types.ObjectId("639332434b82de057e039e7c")
        ]
    },
    {
        "_id": "63933250db47daf8fecc9249" ,
        Id: "1000-1000-1000-1000", 
        UserName: "Mongod2", 
        "DateOfBirth": new Date(), 
        "Email": "Mongod2@Example", 
        "Password": "OldPassword", 
        "Role": "REGULAR", 
        "FollowUserlist": [new mongoose.Types.ObjectId("639330d92e46f24765012859")], 
        "StoryFollowedlist": []
    },
    ]

StoryList:Story[] = [
    {
        "_id": "63933237c9d586d6c8fdf1d0",
        "Writer": {
            "_id": "639330d92e46f24765012859",
            "UserName": "Mongod",
            "Role": "REGULAR",
            "Email": "Mongod@Example",
            "DateOfBirth": new Date(),
        },
        "Title": "Verhaal1",
        "Thumbnail": {
            "ImageName": "GeneriekAfbeelding.png",
            "Base64Image": "niets"
        },
        "StoryLine": "Een verhaal",
        "StoryId": "1110",
        "PublishDate": new Date(),
        "IsAdultOnly": true,
        "Genres": "Actie",
        "Comments": [],
        "ChapterList": []
    },
    {
        "_id": "639332434b82de057e039e7c",
        "Writer": {
            "_id": "639330d92e46f24765012859",
            "UserName": "Mongod",
            "Role": "REGULAR",
            "Email": "Mongod@Example",
            "DateOfBirth": new Date(),
        },
        "Title": "Story2",
        "Thumbnail": {
            "ImageName": "GeneriekAfbeelding.png",
            "Base64Image": "niets"
        },
        "StoryLine": "Een verhaal",
        "StoryId": "1111",
        "PublishDate": new Date(),
        "IsAdultOnly": true,
        "Genres": "Mysterie",
        "Comments": [],
        "ChapterList": []
    }
]

ChapterList: Chapter[]=[
    {
        "StoryId": "1111",
        "Ratings": [{"UserId": "", "Rating": 9}],
        "PublishDate": new Date(),
        "ChapterTitle": "Hoofd1",
        "ChapterNr": 1,
        "ChapterId": "2000",
        "ChapterPage": {
            "PageId": "000",
            "ImageName": "Strip",
            "ComicImage": "StripBase64"
        }
    },
    {
        "StoryId": "1111",
        "Ratings": [{"UserId": "", "Rating": 8}],
        "PublishDate": new Date(),
        "ChapterTitle": "Hoofd2",
        "ChapterNr": 1,
        "ChapterId": "3000",
        "ChapterPage": {
            "PageId": "000",
            "ImageName": "Strip",
            "ComicImage": "StripBase64"
        }
    },
    {
        "StoryId": "1110",
        "Ratings": [{"UserId": "", "Rating": 9}],
        "PublishDate": new Date(),
        "ChapterTitle": "Hoofd3",
        "ChapterNr": 1,
        "ChapterId": "4000",
        "ChapterPage": {
            "PageId": "000",
            "ImageName": "Strip",
            "ComicImage": "StripBase64"
        }
    }
]

CommentsList: Comments[]= [
    {
        "CommentId": "999",
        "Content": "Goed",
        "PublishDate": new Date(),
        "Title": "TitelCOmment",
        "UserId": "1000-1000-1000-1000",
        "Username": "Mongod2"
    }
    ,
    {
        "CommentId": "998",
        "Content": "Goed",
        "PublishDate": new Date(),
        "Title": "TitelCOmment",
        "UserId": "1000-1000-1000-1000",
        "Username": "Mongod2"
    }
]
}
