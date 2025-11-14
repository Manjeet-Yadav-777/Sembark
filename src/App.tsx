import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <>
      <Navbar/>
      <AppRouter/>
      <Footer/>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
