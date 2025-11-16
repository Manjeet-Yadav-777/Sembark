import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
import { ScrollToTop } from "./utils/ScrollToTop";

const App = () => {
  return (
    <>
      <Navbar/>
      <AppRouter/>
      <Footer/>
      <ScrollToTop/>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
