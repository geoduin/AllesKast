export interface IRepo<T>{

    GetAll():Promise<T[] | null| unknown>;
    GetOne(Id: string):Promise<T | null| unknown>;
    Create(object: T):Promise<void | unknown| unknown>;
    Update(Id: string ,UpdatedElement: T): Promise<T | null| unknown>;
    Delete(Id: string): Promise<boolean | T | unknown>;
}