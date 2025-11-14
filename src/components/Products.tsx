import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Products = () => {
  const { products, addToCart } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item) => (
          <Link to={`/product/${item.id}`}
            key={item.id}
            className="
              bg-white rounded-2xl shadow-md 
              overflow-hidden border border-gray-100 
              hover:shadow-xl hover:-translate-y-2 
              transition-all duration-300 ease-out
              flex flex-col justify-between
            "
          >
            {/* Image Box */}
            <div className="h-56 w-full overflow-hidden bg-gray-50">
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full h-full object-contain 
                  p-4 transition-transform duration-300 
                  hover:scale-105
                "
              />
            </div>

            {/* Content */}
            <div className="px-5 pb-5 pt-2">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-xl font-bold text-blue-600 mt-2">
                ${item.price}
              </p>

              <button
                className="
                  w-full mt-4 py-2.5 
                  bg-blue-600 text-white 
                  rounded-lg font-medium 
                  hover:bg-blue-700 
                  transition-all duration-300 
                  shadow-sm hover:shadow-md
                  cursor-pointer
                "
                onClick={(e)=>{
                  e.preventDefault();   
                  e.stopPropagation();     
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
