export interface ImageHolder{
    ImageName: string
    Base64Image: string
}

export class Image implements ImageHolder{
    ImageName!: string
    Base64Image!: string
}