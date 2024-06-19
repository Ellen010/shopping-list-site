import { remult, Allow, BackendMethod } from "remult";
import {Product} from "./Product";

export class ProductsController {
    @BackendMethod({ allowed: Allow.authenticated})
    static async setAllPurchased (purchased:boolean) {
        const productRepo=remult.repo(Product);
        for (const product of await productRepo.find()) {
          await productRepo.save({...product, purchased});
        }
      };
}