import { Entity, Fields } from "remult"

@Entity("products",  {
    allowApiCrud: true
})
export class Product {
    @Fields.autoIncrement()
    id=0
    @Fields.string()
    title= ""
    @Fields.boolean()
    purchased=false
}