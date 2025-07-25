import { Outlet } from "react-router";
import Navbar from "./Navbar"
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;