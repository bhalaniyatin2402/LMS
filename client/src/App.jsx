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
        <div className="w-full">
          <Header />
          <div className="w-full max-w-[1296px] mx-auto">
            <CoutomRoutes />
          </div>
          <Footer />
          {isLoggedIn && <ChatIcon />}
        </div>
      </Suspense>
    </>
  );
}

export default App;
