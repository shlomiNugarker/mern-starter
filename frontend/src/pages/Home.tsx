import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background text-foreground flex flex-col items-center justify-center">
      {t("home_welcome")}
    </section>
  );
};
