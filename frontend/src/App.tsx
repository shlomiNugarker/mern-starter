import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import Header from "./components/Header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir =
      i18n.language === "he" || i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-1 md:py-6 flex flex-col justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
