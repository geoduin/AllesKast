export interface IRepo<T>{

    Create(dto: T): Promise<T>;
    All():Promise<T>;
}