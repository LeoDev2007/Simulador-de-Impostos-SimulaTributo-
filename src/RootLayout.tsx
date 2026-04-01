
import Background from "./components/Background";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const RootLayout = () => {
  return (
    <>
      <Background>
        <Header />
        <Outlet />
        <Footer />
      </Background>
    </>
  );
};

export default RootLayout;
