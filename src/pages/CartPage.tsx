import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeItem } = useAppContext();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-12 pt-[14vh] bg-gray-100"
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

      <section className="min-h-screen bg-gray-100 mt-5">
        {cart.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-2xl p-12 flex flex-col items-center justify-center min-h-[60vh] border border-gray-100"
            >
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="text-gray-600 text-lg">Looks like you haven't added anything to your cart yet.</p>
                <Link
                  to="/"
                  className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg cursor-pointer"
                >
                  Back to Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 sm:w-20 sm:h-20 object-contain rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />

                      <div className="flex flex-col gap-1 max-w-[200px] sm:max-w-none">
                        <h3 className="font-semibold text-gray-800">
                          {item.title.slice(0, 30)}...
                        </h3>

                        <p className="text-sm text-gray-500">
                          ₹{item.price} X {item.qty} = ₹
                          {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-3 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            decreaseQty(item.id);
                            toast.success("Quantity Decreased");
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-300 rounded-lg text-lg font-bold hover:bg-gray-400 transition-colors"
                        >
                          -
                        </motion.button>
                        <span className="font-semibold text-lg min-w-8 text-center">
                          {item.qty}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            increaseQty(item.id);
                            toast.success("Quantity Increased");
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-300 rounded-lg text-lg font-bold hover:bg-gray-400 transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          removeItem(item.id);
                          toast.success("Item Removed");
                        }}
                        className="text-sm px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 h-fit sticky top-4 border border-gray-100"
            >
              <h2 className="text-xl font-bold mb-4">Price Details</h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <p>Total Items</p>
                  <p className="font-semibold">{cart.length}</p>
                </div>

                <div className="flex justify-between">
                  <p>Total Amount</p>
                  <p className="font-semibold">₹{totalAmount.toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Delivery Charges</p>
                  <p className="text-green-600 font-semibold">FREE</p>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <p>Grand Total</p>
                  <p>₹{totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white mt-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
              >
                Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </section>
    </motion.main>
  );
};

export default CartPage;
