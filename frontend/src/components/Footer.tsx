import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="rounded-lg shadow m-4 bg-muted text-foreground">
      <div className="w-full container mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <img
              src={`/images/logo.png`}
              className="h-8"
              alt="Company Logo"
              height={40}
              width="80%"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li className="me-4 md:me-6">
              <Link
                to="/"
                className="hover:underline text-foreground transition-colors duration-200 ease-in-out"
              >
                {t("home_page")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-border sm:mx-auto lg:my-8" />
        <span className="block text-sm sm:text-center">
          © 2025{" "}
          <Link to="/" className="hover:underline text-foreground">
            The company name™
          </Link>
          . {t("all_rights_reserved")}
        </span>
      </div>
    </footer>
  );
};
