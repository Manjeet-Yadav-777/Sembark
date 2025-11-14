import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex h-[10vh] items-center px-14 justify-between shadow fixed w-full bg-white">
      <h1 className="font-bold text-xl">Sembark</h1>

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
