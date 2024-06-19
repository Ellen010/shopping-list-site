import { BackendMethod } from "remult";
import {Product} from "./Product";

export class ProductController {
    @BackendMethod({ allowed:true})
    static async setAllPurchased =async (purchased:boolean) => {
        const productRepo=remult.repo(Product);
        for (const product of await productRepo.find()) {
          await productRepo.save({...product, purchased});
        }
      };
}