import FilterProducts from "../components/FilterProducts";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="pt-[10vh] px-4 bg-gray-100">
       <FilterProducts/>
      <Products />
    </div>
  );
};

export default Home;
