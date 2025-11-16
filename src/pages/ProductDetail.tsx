import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const ProductDetail = () => {
  const { addToCart, getSingleProduct, singleProduct } =
    useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      getSingleProduct(Number(id));
    }
  }, [id]);

  if (!singleProduct)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading Product...
      </div>
    );

  return (
    <main className="px-6 py-12 pt-[14vh] ">
      <Link to={"/"} className="text-blue-600 flex gap-1 items-center lg:ml-14">
        <span>
          <ArrowLeft size={16} />
        </span>{" "}
        Back to Home
      </Link>
      <section className="max-w-6xl mx-auto mt-10  grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[100vh]">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-full max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="product-title text-3xl font-bold text-gray-900 leading-snug">
            {singleProduct.title}
          </h1>

          <p className="product-price text-blue-600 text-3xl font-semibold mt-4">
            ₹{singleProduct.price}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {singleProduct.description}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(singleProduct);
                toast.success("Item added to Cart");
              }}
              className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow hover:shadow-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(singleProduct);
                toast.success("Processing to Cart...");
                navigate("/cart");
              }}
              className="px-6 py-3 cursor-pointer border border-gray-400 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-5 flex items-center gap-1 text-yellow-500">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span className="text-gray-500 ml-2 text-sm">(120 reviews)</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
