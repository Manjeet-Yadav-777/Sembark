import { useAppContext } from "../context/AppContext";

const FilterProducts = () => {
  const { filterByCategory, sortByPrice } = useAppContext();

  return (
    <div className="mt-4 px-4 md:px-10">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
        Filters
      </h1>

      {/* CATEGORY FILTER */}
      <div className="flex gap-4 my-6 overflow-x-auto scrollbar-hide">
        {[
          { label: "All", value: "all" },
          { label: "Electronics", value: "electronics" },
          { label: "Jewelery", value: "jewelery" },
          { label: "Men", value: "men's clothing" },
          { label: "Women", value: "women's clothing" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => filterByCategory(item.value)}
            className="px-4 py-2 bg-white rounded text-sm md:text-base cursor-pointer shrink-0 border"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SORT FILTER */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => sortByPrice("low-to-high")}
          className="px-4 py-2 bg-white rounded text-sm md:text-base cursor-pointer shrink-0 border"
        >
          Price: Low → High
        </button>

        <button
          onClick={() => sortByPrice("high-to-low")}
          className="px-4 py-2 bg-white rounded text-sm md:text-base cursor-pointer shrink-0 border"
        >
          Price: High → Low
        </button>
      </div>
    </div>
  );
};

export default FilterProducts;
