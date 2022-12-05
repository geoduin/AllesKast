import { UserDto } from "./neo4User";

export interface neoStoryDto{
    Title:string,
    Genre:string,
    Writer: UserDto
}

export interface neoStoryDtoPartial{
    Title:string,
    Genre:string,
}