import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-1 md:py-6 flex flex-col justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
