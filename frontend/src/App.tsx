import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

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
      <Routes>
        {/* דפים בלי Header */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* דפים עם Header */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
