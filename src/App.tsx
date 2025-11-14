import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <>
      <Navbar/>
      <AppRouter/>
      <Footer/>
    </>
  );
};

export default App;
