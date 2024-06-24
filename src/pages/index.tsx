import { useEffect, useState, FormEvent } from "react";
import { remult } from "remult";
import { Product } from "../shared/Product";
import { ProductsController } from "@/shared/ProductsController";
import { useSession, signIn, signOut } from "next-auth/react";

const productRepo = remult.repo(Product);

async function fetchProducts() {
  return productRepo.find({
    orderBy: {
      purchased: "asc"
    }
  });
}

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductTitle, setNewProductTitle] = useState("");

  const addProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = await productRepo.insert({ title: newProductTitle });
      setProducts([...products, newProduct]);
      setNewProductTitle("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const setAllPurchased = async (purchased: boolean) => {
    try {
      await ProductsController.setAllPurchased(purchased);
      fetchProducts().then(setProducts);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") signIn();
    else fetchProducts().then(setProducts);
  }, [session]);

  return (
    <div className="bg-picMain h-screen flex items-center flex-col justify-center text-lg bg-cover">
      <h1 className="text-gold text-8xl italic bold shadow-lg mb-2">Shopping list {products.length} </h1>
      <main className="bg-white border rounded-lg shadow-lg m-15 w-screen max-w-md">
        <div className="flex justify-between px-6 p-10 border-b">
          Welcome to our website, {session?.user?.name}{" "}
          <div className="gap-4 flex justify-between">
          <button 
          className="text-white px-3 py-1 font-semibold rounded-lg mb-2"
          style={{
            backgroundImage: 'url(/backgroundBtn2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
        
        <form onSubmit={addProduct} className="border-b-3 px-8 gap-2 flex">
          <input
            value={newProductTitle}
            onChange={(e) => setNewProductTitle(e.target.value)}
            className="border-b gap-2 h-30 w-130"
            placeholder="What needs to be purchased?"
          />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </form>
        {products.map((product) => {
          const setProduct = (value: Product) =>
            setProducts(products.map((t) => (t === product ? value : t)));

          const setPurchased = async (purchased: boolean) =>
            setProduct(await productRepo.save({ ...product, purchased }));

          const setTitle = (title: string) => setProduct({ ...product, title });

          const saveProduct = async () => {
            console.log("Save button clicked for product:", product);
            try {
              const savedProduct = await productRepo.save(product);
              setProduct(savedProduct);
              console.log("Product saved:", savedProduct);
            } catch (err: any) {
              console.error("Error saving product:", err.message);
              alert(err.message);
            }
          };

          const deleteProduct = async () => {
            try {
              await productRepo.delete(product);
              setProducts(products.filter((t) => t !== product));
            } catch (err: any) {
              alert(err.message);
            }
          };

          return (
            <div key={product.id} className="border-b px-6 gap-2 flex items-center p-2">
              <input type="checkbox" checked={product.purchased} className="w-6 h-6" onChange={(e) => setPurchased(e.target.checked)} />
              <input value={product.title} className="w-full" onChange={(e) => setTitle(e.target.value)} />
              <button onClick={saveProduct}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="size-6">
                <defs>
                <pattern id="imagePattern" patternUnits="userSpaceOnUse" width="24" height="24">
                  <image href="/backgroundBtn1.png" x="0" y="0" width="24" height="24" />
                </pattern>
              </defs>
              <path d="M12 4.5v15m7.5-7.5h-15" fill="url(#imagePattern)" />
                  {/* <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /> */}
                </svg>
              </button>
              <button onClick={deleteProduct}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="peach" className="size-6">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          );
        })}
        <div className="border-t px-6 p-2 gap-4 flex justify-between">
          <button
            className="text-white px-3 py-1 font-semibold rounded-lg mb-2"
            style={{
              backgroundImage: 'url(/backgroundBtn1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => setAllPurchased(true)}
          >
            Set all purchased
          </button>
          <div className="gap-4"></div>
          <div></div>
          <button
            className="text-white px-3 py-1 font-semibold rounded-lg mb-2"
            style={{
              backgroundImage: 'url(/backgroundBtn2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => setAllPurchased(false)}
          >
            Set all to not purchased
          </button>
        </div>
      </main>
    </div>
  );
}
