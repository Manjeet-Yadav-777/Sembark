import { Link, useLocation } from "react-router-dom";
import { useAppContext, type SortOption } from "../context/AppContext";
import { useEffect } from "react";
import { X, RotateCcw } from "lucide-react";

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="mb-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Filter by Category</h2>
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes("All")}
                onChange={(e) => handleCategoryChange("All", e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-base font-medium">All</span>
            </label>

            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-base font-medium capitalize">{category}</span>
              </label>
            ))}
          </div>

          {selectedCategories.length > 0 &&
            !(selectedCategories.length === 1 && selectedCategories[0] === "All") && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => {
                          const newSelected = selectedCategories.filter((c) => c !== category);
                          filterProducts(newSelected.length === 0 ? ["All"] : newSelected);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Sort Products</h2>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        <div className="text-gray-600">
          Showing {products.length} {products.length === 1 ? "product" : "products"}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found.</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition-all flex flex-col"
            >
              <div className="h-56 w-full bg-gray-50 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain p-4" />
              </div>
              <div className="px-5 pb-5 pt-2">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{item.title}</h2>
                <p className="text-xl font-bold text-blue-600 mb-2">₹{item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
