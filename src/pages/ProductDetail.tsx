import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-12 pt-[14vh]"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={"/"} className="text-blue-600 flex gap-1 items-center lg:ml-14 hover:text-blue-700 transition-colors">
          <span>
            <ArrowLeft size={16} />
          </span>{" "}
          Back to Home
        </Link>
      </motion.div>

      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center border border-gray-100"
        >
          <motion.img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-full max-h-[420px] object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize mb-3"
            >
              {singleProduct.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-4xl font-bold text-gray-900 leading-tight mb-4"
            >
              {singleProduct.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-yellow-500 text-xl">⭐</span>
              </div>
              <span className="text-gray-600 text-sm font-medium">4.5 (120 reviews)</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gray-50 rounded-xl p-4 border border-gray-200"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-blue-600 text-4xl font-bold">₹{singleProduct.price.toFixed(2)}</span>
              <span className="text-gray-400 text-xl line-through">₹{(singleProduct.price * 1.5).toFixed(2)}</span>
              <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded">33% OFF</span>
            </div>
            <p className="text-gray-600 text-sm">Inclusive of all taxes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {singleProduct.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-green-800 font-semibold text-sm mb-1">In Stock</p>
                <p className="text-green-700 text-xs">Free delivery on orders above ₹500</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(singleProduct);
                toast.success("Item added to Cart");
              }}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg cursor-pointer"
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(singleProduct);
                toast.success("Processing to Cart...");
                navigate("/cart");
              }}
              className="flex-1 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all text-lg cursor-pointer"
            >
              Buy Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default ProductDetail;
