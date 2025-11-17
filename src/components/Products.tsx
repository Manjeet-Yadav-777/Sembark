import { Link, useLocation } from "react-router-dom";
import { useAppContext, type SortOption } from "../context/AppContext";
import { useEffect, useState } from "react";
import { X, RotateCcw, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const {
    allProducts,
    products,
    loading,
    selectedCategories,
    sortOption,
    filterProducts,
    sortProducts,
    resetFilters,
  } = useAppContext();

  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const categories: string[] = [];
  allProducts.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });
  categories.sort();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const categoriesParam = params.get("categories");
    const sortParam = params.get("sort");
    if (categoriesParam) {
      const urlCategories = categoriesParam.split(",").filter(Boolean);
      const urlSorted = [...urlCategories].sort();
      const currentSorted = [...selectedCategories].sort();
      if (JSON.stringify(urlSorted) !== JSON.stringify(currentSorted)) {
        filterProducts(urlCategories);
      }
    } else if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filterProducts(["All"]);
    }
    if (sortParam && ["price-low", "price-high", "name-asc", "name-desc"].includes(sortParam)) {
      if (sortParam !== sortOption) {
        sortProducts(sortParam as SortOption);
      }
    }
  }, [location.search]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newSelected: string[] = [];
    if (category === "All") {
      newSelected = checked ? ["All"] : [];
    } else {
      newSelected = selectedCategories.filter((c) => c !== "All");
      if (checked) {
        newSelected.push(category);
      } else {
        newSelected = newSelected.filter((c) => c !== category);
      }
      if (newSelected.length === 0) {
        newSelected = ["All"];
      }
    }
    filterProducts(newSelected);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortProducts(e.target.value as SortOption);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold"
        >
          Products
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          <Filter size={20} />
          <span>Filters</span>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <AnimatePresence>
          {(isFilterOpen || isDesktop) && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:w-80 shrink-0 space-y-4"
            >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filter by Category</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes("All")}
                  onChange={(e) => handleCategoryChange("All", e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-base font-medium">All</span>
              </label>

              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-base font-medium capitalize">{category}</span>
                </label>
              ))}
            </div>

            {selectedCategories.length > 0 &&
              !(selectedCategories.length === 1 && selectedCategories[0] === "All") && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <motion.span
                        key={category}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {category}
                        <button
                          onClick={() => {
                            const newSelected = selectedCategories.filter((c) => c !== category);
                            filterProducts(newSelected.length === 0 ? ["All"] : newSelected);
                          }}
                          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Sort Products</h2>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 mb-6 font-medium"
          >
            Showing {products.length} {products.length === 1 ? "product" : "products"}
          </motion.div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-500">No products found.</p>
            </motion.div>
          )}

          {!loading && products.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {products.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link
                    to={`/product/${item.id}`}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col h-full group"
                  >
                    <div className="h-56 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                    <div className="px-5 pb-5 pt-2">
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                        {item.title}
                      </h2>
                      <p className="text-xl font-bold text-blue-600 mb-2">₹{item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
