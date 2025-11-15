import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
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
  allProducts: Product[];
  singleProduct: Product | null;
  loading: boolean;

  fetchProducts: () => Promise<void>;
  getSingleProduct: (id: number) => void;
  addToCart: (product: Product) => void;
  cart: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;

}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [singleProduct, setSingleProduct] = useState<Product | null>(null);

  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("allProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState<boolean>(false);

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
        category: item.category,
        description: item.description,
      }));

      setAllProducts(formatted);
      setProducts(formatted);

      localStorage.setItem("allProducts", JSON.stringify(formatted));
      localStorage.setItem("products", JSON.stringify(formatted));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (id: number) => {
    try {
      setLoading(true);

      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      console.log(data);

      const formatted: Product = {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.image,
        category: data.category,
        description: data.description,
      };

      setSingleProduct(formatted);

      localStorage.setItem("singleProduct", JSON.stringify(formatted));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id: number): void => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number): void => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number): void => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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
        getSingleProduct,
        addToCart,
        cart,
        increaseQty,
        decreaseQty,
        removeItem,
        allProducts,
        singleProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
