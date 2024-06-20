import { Categoria } from "./categoria"

export class Productos{
    idProducto:number=0
    nombre:string=""
    descripcion:string=""
    precio:number=0
    disponibilidad:boolean=true
    fotos:boolean=true
    categoria:Categoria= new Categoria()
}