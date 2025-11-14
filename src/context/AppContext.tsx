import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";


// ------------------ Types ------------------

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description : String;
  category : String;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}


interface AppContextType {
  products: Product[];
  loading: boolean;

  fetchProducts: () => Promise<void>;
  addToCart: (product: Product) => void;
  cart: CartItem[];  

}

// ------------------ Context ------------------

const AppContext = createContext<AppContextType | undefined>(undefined);

// ------------------ Provider ------------------

interface ProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: ProviderProps) => {
  // Load from localStorage on first render
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

const [cart, setCart] = useState<CartItem[]>(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});


  const [loading, setLoading] = useState<boolean>(false);

  // ------------------ FETCH PRODUCTS ------------------

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data);
      

      const formatted: Product[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        category : item.category,
        description : item.description,
      }));

      setProducts(formatted);
      localStorage.setItem("products", JSON.stringify(formatted));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  const addToCart = (product: Product) => {
  setCart(prev => {
    const exists = prev.find(item => item.id === product.id);

    if (exists) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }
    

    return [...prev, { ...product, qty: 1 }];
  });
};



  // Fetch once if localStorage is empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  
}, [cart]);


  return (
    <AppContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addToCart,
        cart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ------------------ Custom Hook ------------------

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
