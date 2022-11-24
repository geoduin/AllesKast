export interface IRepo<T>{

    GetAll():Promise<T[] | null>;
    GetOne(Id: string):Promise<T | null>;
    Create(object: T):Promise<void | null>;
    Update(Id: string ,UpdatedElement: T): Promise<T | null>;
    Delete(Id: string): Promise<boolean>;
}