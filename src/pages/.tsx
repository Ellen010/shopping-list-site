import { useEffect, useState } from "react";
import { remult } from "remult";
import { Product } from "../shared/Product";

const productRepo = remult.repo(Product);

function fetchProducts () {
  return productRepo.find({
    orderBy:{
      purchased:"asc"
    }
  });
}

export default function Home() {
  const [products, setProducts]=useState<Product[]>([]);
  const [newProductTitle, setNewProductTitle]=useState("");

  const addProduct=async (e: FormEvent) => {
    e.preventDefault ();
  try {
    const newProduct = await productRepo.insert({title:newProductTitle})
    setProducts([...products, newProduct]);
    setNewProductTitle("");
  } catch (err:any) {
    alert (err.message);
  }
};
  useEffect(()=> {
    fetchProducts().then(setProducts);
  },[]);

  return (
    <div className="bg-blue-50 h-screen flex items-center flex-col justify-center text-lg">
      <h1 className="text-red-500 text-6x1 italic">Shopping list {products.length} </h1>
      <main className="bg-white border rounded-lg shadow-lg m-5 w-screen max-w-md">
        <form onSubmit={addProduct}>
          <input
          value={newProductTitle}
          onChange={(e) => setNewProductTitle(e.target.value)}
          className="border-b gap-2 h-30 w-30"
          placeholder="What needs to be purchased?"
        />
        <button>Add product</button>
        </form>
        {products.map((product) =>{
          const setProduct= (value: Product) =>
            setProducts(product.map((t)=> (t===product ? value: t)));

          const setPurchased= async (purchased:boolean) =>
            setProduct (await productRepo.save ({...product, purchased}));
        return (
          <div key={product.id}
            className="border-b px-6 gap-2 flex items-enter p-2">
         <input type="checkbox" checked={product.purchased} 
         className="w-6 h-6"
         onChange={(e) => setPurchased (e.target.purchased)}/>
         {product.title}
          </div>
        );
      })}
      </main>
      </div>
  );
}
