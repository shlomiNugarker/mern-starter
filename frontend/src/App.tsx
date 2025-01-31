import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";

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
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
