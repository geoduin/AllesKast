export interface IRepo<T>{

    Delete(jsonId: string):boolean
    Add(element:T):T
    Update(element:T):boolean
    GetOne(id: string): T
    All():T
}