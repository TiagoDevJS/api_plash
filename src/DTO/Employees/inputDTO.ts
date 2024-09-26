import { spec } from "node:test/reporters"

export type createEmployeeDTO = {
    id?:number
    name:string
    email:string
    password:string
    profession:string
    phone:string
    commission:number
    avatar:any
  
}
export type QueryEmployee = {
    take:number,
    page?:number,
    skip:number,
    name:string,
    profession:string,
    email:string
}
