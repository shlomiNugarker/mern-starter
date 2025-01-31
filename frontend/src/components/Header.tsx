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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
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
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors duration-200 px-4 py-2 hover:underline truncate"
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
      className="min-h-0 shadow-md bg-primary sticky w-full z-10 top-0 backdrop-blur-lg"
      style={{
        backgroundImage: `/images/header-bg.jpg`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="container mx-auto z-10 top-0 flex justify-between flex-col items-center p-6 text-primary-foreground">
        <div className="flex justify-between w-full items-center">
          <Link to="/" className="transition-colors duration-200 mr-5">
            <img
              src={`/images/logo.png`}
              alt="logo"
              className="h-10 w-[80%] "
              width={200}
              height={50}
            />
          </Link>

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
            <NavigationMenuList className="">
              {renderMenuItems()}
            </NavigationMenuList>
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
