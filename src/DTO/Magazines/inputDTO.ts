import { employeesType } from "../../Entities/magazine"

export type  createMagzineInputDTO = {
    name:string,
    author:string
    cover:string
    company:string
    volume:string
    description:string
    slug:string
    price:number
    magazine_pdf:string
    subCategory:string
    model:string
    categoryId:number
    employees?:employeesType[]
}
export type  updateMagazineInputDTO = {
    name:string,
    author:string
    cover:string
    company:string
    volume:string
    description:string
    slug:string
    price:number
    magazine_pdf:string
    subCategory:string
    model:string
    categoryId:number
    article?:[],
    Category?:[],
    employees?:[]
}
export type QueryMagazine = {
    take:number | undefined,
    skip:number | undefined,
    page?:number | undefined
    name:string | undefined,
    company:string | undefined,
    volume:string | undefined,
    author:string | undefined,
   category:string | undefined
    articles?:any
    employees?:any

}