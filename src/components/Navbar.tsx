import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { cart } = useAppContext();
  return (
    <div className="flex h-[10vh] z-96 items-center lg:px-14 px-5 justify-between shadow fixed w-full bg-white">
      <Link to={"/"} className="font-bold lg:text-2xl text-xl text-blue-600">
        Sembark
      </Link>

      <div className="flex lg:gap-14 gap-5 text-md text-gray-700 font-semibold">
        <Link to={"/"} className="hover:text-black">
          Home
        </Link>
        <Link to={"/"} className="hover:text-black">
          Products
        </Link>
      </div>

      <div>
        <Link to={"/cart"} className="flex relative">
          <ShoppingCart size={32} />
          <span className="absolute bottom-5 left-5 bg-red-400 px-2 text-white rounded-full">
            {cart.length > 0 ? cart.length : null}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
