import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex h-[10vh] z-96 items-center px-14 justify-between shadow fixed w-full bg-white">
      <Link to={"/"} className="font-bold text-xl text-blue-600">Sembark</Link>

      <div className="flex gap-14 text-md text-gray-700 font-semibold">
        <Link to={"/"} className="hover:text-black">Home</Link>
        <Link to={"/products"} className="hover:text-black">Products</Link>
      </div>

      <div>
        <Link to={"/cart"}>Cart</Link>
      </div>
    </div>
  );
};

export default Navbar;
