import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductDetail = () => {
  const { products, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading Product...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 pt-[14vh] h-[100vh]">
      
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center">
        
        <h1 className="text-3xl font-bold text-gray-900 leading-snug">
          {product.title}
        </h1>

        <p className="text-blue-600 text-3xl font-semibold mt-4">
          ${product.price}
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
        </p>

        <div className="mt-6 flex gap-4">
          <button onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            addToCart(product)
          }} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow hover:shadow-lg">
            Add to Cart
          </button>

          <button className="px-6 py-3 border border-gray-400 rounded-lg font-semibold hover:bg-gray-50 transition-all">
            Buy Now
          </button>
        </div>

        <div className="mt-5 flex items-center gap-1 text-yellow-500">
          <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
          <span className="text-gray-500 ml-2 text-sm">(120 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
