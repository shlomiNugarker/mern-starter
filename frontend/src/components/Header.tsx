import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    {
      label: t("login_page"),
      path: "/login",
    },
    {
      label: t("register_page"),
      path: "/register",
    },
    {
      label: t("dashboard_page"),
      path: "/dashboard",
    },
    {
      label: t("home_page"),
      path: "/",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderMenuItems = (isMobile: boolean = false) => (
    <>
      <li>
        <LanguageToggle changeLanguage={changeLanguage} />
      </li>
      {menuItems.map((item, index) => (
        <NavigationMenuItem key={index} asChild>
          <li>
            <Link
              to={item.path}
              rel="noopener noreferrer"
              className={`text-xl transition-colors duration-200 px-4 py-2 hover:underline truncate ${
                isMobile ? "text-center" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <div
      className="min-h-0 shadow-md bg-blue-500 sticky w-full z-10 top-0 backdrop-blur-lg"
      style={{
        backgroundImage: `/images/header-bg.jpg`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="container mx-auto z-10 top-0 flex justify-between flex-col items-center p-6 text-primary-foreground">
        <div className="flex justify-between w-full items-center">
          {user && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-white font-semibold  mx-2">
                {t("welcome")}, {user.name}!
              </span>
            </div>
          )}
          <button
            aria-label="Menu"
            onClick={toggleMenu}
            className="xl:hidden focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-primary-foreground" />
            )}
          </button>

          <NavigationMenu dir={i18n.dir()} className="hidden xl:flex">
            <NavigationMenuList>{renderMenuItems()}</NavigationMenuList>
          </NavigationMenu>
        </div>

        {isMenuOpen && (
          <div className="top-full left-0 w-full text-primary-foreground xl:hidden">
            <ul className="flex flex-col p-4 space-y-2 items-center justify-center">
              {renderMenuItems(true)}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
