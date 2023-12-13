import { Suspense } from "react";
import { useSelector } from "react-redux";

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import CoutomRoutes from "./routes/CoutomRoutes";
import Loader from "./components/ui/Loader";
import ChatIcon from "./pages/chat/ChatIcon";

function App() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <CoutomRoutes />
        <Footer />
        {isLoggedIn && <ChatIcon />}
      </Suspense>
    </>
  );
}

export default App;
