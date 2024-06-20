import { Entity, Fields, Allow, remult } from "remult"

@Entity("products",  {
    allowApiCrud: Allow.authenticated, 
    allowApiInsert: "admin",
    allowApiDelete:  "admin",
})
export class Product {
    @Fields.autoIncrement()
    id=0
    @Fields.string<Product>({
        allowApiUpdate: "admin",
        validate: product => {
            if (product.title.length < 3)
                throw Error ("The product name is too short. Please enter another product.")
        }
    })
    title= ""
    @Fields.boolean()
    purchased=false
}