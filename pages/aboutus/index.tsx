import { Button, Group } from "@mantine/core";
import { withSessionSsr } from "../../session";
import SmallHero from "../../components/global/Heros/SmallHero";
import Brands from "../../components/homepage/brands";
import WhoWeAre from "../../components/aboutus/WhoWeAre";
import FindUs from "../../components/aboutus/FindUs";
import FAQ from "../../components/global/FAQ";
import OurTopCars from "../../components/aboutus/OurTopCars";
import { GetCarsAboutData } from "../../Services/CarDataServices";
import { useTranslations } from "next-intl";

export default function ServicesPage({
  CarsData,
  lang,
}: {
  CarsData: [];
  lang: any;
}) {
  const t = useTranslations("About");

  return (
    <>
      <SmallHero noSearch title={t("title")} t={t} />
      <Brands />
      <WhoWeAre t={t} lang={lang} />
      <FindUs t={t} lang={lang}/>
      <FAQ t={t} />
      <OurTopCars CarsData={CarsData} t={t} />
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: { req: any }) {
    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";
    const CarsData = await GetCarsAboutData(lang);
    return {
      props: {
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
        CarsData,
      },
    };
  }
);
