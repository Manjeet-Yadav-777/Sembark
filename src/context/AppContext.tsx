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
  loading: boolean;

  fetchProducts: () => Promise<void>;
  addToCart: (product: Product) => void;
  cart: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  filterByCategory: (category: string) => void;
  sortByPrice: (order: string) => void;
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

      setProducts(formatted);
      localStorage.setItem("products", JSON.stringify(formatted));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category: string) => {
    const allProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    if (category === "all") {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((item) => item.category === category);

    setProducts(filtered);
  };

  const sortByPrice = (order: string) => {
    let sorted = [...products];

    if (order === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (order === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setProducts(sorted);
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
        cart,
        increaseQty,
        decreaseQty,
        removeItem,
        filterByCategory,
        sortByPrice
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
