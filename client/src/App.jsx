import { Suspense } from "react";

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import CoutomRoutes from "./routes/CoutomRoutes";
import Loader from "./components/ui/Loader";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <CoutomRoutes />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
