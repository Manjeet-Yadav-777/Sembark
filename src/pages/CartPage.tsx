import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeItem } = useAppContext();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="px-6 py-12 pt-[14vh] bg-gray-100">
      <Link to={"/"} className="text-blue-600 flex gap-1 items-center lg:ml-14">
        <span>
          <ArrowLeft size={16} />
        </span>{" "}
        Back to Home
      </Link>

      <div className="min-h-screen bg-gray-100 mt-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          {/* Cart Items */}
          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-lg text-center mt-20">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl border"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 sm:w-20 sm:h-20 object-contain"
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
                        <button
                          onClick={() => {
                            decreaseQty(item.id);
                            toast.success("Quantity Decreased");
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-300 rounded-lg text-lg font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold text-lg">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => {
                            increaseQty(item.id);
                            toast.success("Quantity Increased");
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center bg-gray-300 rounded-lg text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          removeItem(item.id);
                          toast.success("Item Removed");
                        }}
                        className="text-sm px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Price Details</h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <p>Total Items</p>
                <p>{cart.length}</p>
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

            <button className="w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white mt-6 py-3 rounded-xl transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
