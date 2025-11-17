import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

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

export type SortOption = "price-low" | "price-high" | "name-asc" | "name-desc";

interface AppContextType {
  products: Product[];
  allProducts: Product[];
  singleProduct: Product | null;
  loading: boolean;
  selectedCategories: string[];
  sortOption: SortOption;
  cart: CartItem[];

  fetchProducts: () => Promise<void>;
  getSingleProduct: (id: number) => void;
  addToCart: (product: Product) => void;
  filterProducts: (categories: string[]) => void;
  sortProducts: (option: SortOption) => void;
  resetFilters: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (productId: number) => void;
  removeItem: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("allProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = sessionStorage.getItem("selectedCategories");
    if (saved) return JSON.parse(saved);
    const params = new URLSearchParams(window.location.search);
    const categoriesParam = params.get("categories");
    if (categoriesParam) return categoriesParam.split(",").filter(Boolean);
    return ["All"];
  });

  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const saved = sessionStorage.getItem("sortOption");
    if (saved) return saved as SortOption;
    const params = new URLSearchParams(window.location.search);
    const sortParam = params.get("sort");
    if (sortParam && ["price-low", "price-high", "name-asc", "name-desc"].includes(sortParam)) {
      return sortParam as SortOption;
    }
    return "price-low";
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        description: item.description,
      }));
      setAllProducts(formatted);
      localStorage.setItem("allProducts", JSON.stringify(formatted));

      const filtered = selectedCategories.includes("All") || selectedCategories.length === 0
        ? [...formatted]
        : formatted.filter((p: Product) => selectedCategories.includes(p.category));
      const sorted = sortProductsList(filtered, sortOption);
      setProducts(sorted);
      
    } catch (error : any) {
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setSingleProduct({
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.image,
        category: data.category,
        description: data.description,
      });
    } catch (error : any) {
      toast.error(error.message || error);
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

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromCart = (productId: number) => {
    removeItem(productId);
  };

  const filterProducts = (categories: string[]) => {
    setSelectedCategories(categories);
    sessionStorage.setItem("selectedCategories", JSON.stringify(categories));
    const params = new URLSearchParams(window.location.search);
    if (categories.includes("All") || categories.length === 0) {
      params.delete("categories");
    } else {
      params.set("categories", categories.join(","));
    }
    window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`);
    let filtered = allProducts;
    if (!categories.includes("All") && categories.length > 0) {
      filtered = allProducts.filter((p) => categories.includes(p.category));
    }
    const sorted = sortProductsList(filtered, sortOption);
    setProducts(sorted);
  };

  const sortProducts = (option: SortOption) => {
    setSortOption(option);
    sessionStorage.setItem("sortOption", option);
    const params = new URLSearchParams(window.location.search);
    params.set("sort", option);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    let filtered = allProducts;
    if (!selectedCategories.includes("All") && selectedCategories.length > 0) {
      filtered = allProducts.filter((p) => selectedCategories.includes(p.category));
    }
    const sorted = sortProductsList(filtered, option);
    setProducts(sorted);
  };

  const sortProductsList = (list: Product[], option: SortOption): Product[] => {
    const sorted = [...list];
    if (option === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "name-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sorted;
  };

  const resetFilters = () => {
    setSelectedCategories(["All"]);
    setSortOption("price-low");
    sessionStorage.removeItem("selectedCategories");
    sessionStorage.removeItem("sortOption");
    window.history.replaceState({}, "", window.location.pathname);
    const sorted = sortProductsList([...allProducts], "price-low");
    setProducts(sorted);
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      let filtered = allProducts;
      if (!selectedCategories.includes("All") && selectedCategories.length > 0) {
        filtered = allProducts.filter((p) => selectedCategories.includes(p.category));
      }
      const sorted = sortProductsList(filtered, sortOption);
      setProducts(sorted);
    }
  }, [allProducts, selectedCategories, sortOption]);

  return (
    <AppContext.Provider
      value={{
        products,
        allProducts,
        singleProduct,
        loading,
        selectedCategories,
        sortOption,
        cart,
        fetchProducts,
        getSingleProduct,
        addToCart,
        filterProducts,
        sortProducts,
        resetFilters,
        increaseQty,
        decreaseQty,
        removeFromCart,
        removeItem,
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

