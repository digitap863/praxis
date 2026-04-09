import { AOSInit } from "@/components/AOSInit";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const Layout = ({ children }) => {
    return (
        <div className="w-full min-h-screen overflow-hidden bg-[#FAFAFA] ">
            <AOSInit />
            <Navbar />
            <main className="">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;