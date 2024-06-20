import { remultNext } from "remult/remult-next";
import { Product } from "../../shared/Product";
import { ProductsController } from "@/shared/ProductsController";
import { getUserFromNextAuth } from "./auth/[...nextauth]";
import { createPostgresConnection } from "remult/postgres";

export default remultNext ({
    controllers: [ProductsController],
    entities: [Product],
    getUser: getUserFromNextAuth, 
    dataProvider: createPostgresConnection()
})