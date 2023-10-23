import { useEffect } from "react";
import { Button, Container, Grid, Group, Text } from "@mantine/core";
import FeaturesCard from "../components/global/CarCard";
import MainHero from "../components/global/Heros/MainHero";
import Brands from "../components/homepage/brands";
import { useTranslations } from "next-intl";
import { withSessionSsr } from "../session";
import ChooseCards from "../components/homepage/ChooseCards";
import OurSpecialCars from "../components/homepage/OurSpecialCars";
import DownloadOurApp from "../components/global/DownloadOurApp";
import FAQ from "../components/global/FAQ";
import { useSession } from "next-auth/react";
import { GetCarsData, GetCategoriesData } from "../Services/CarDataServices";
import Head from "next/head";

export default function IndexPage({
  CategoriesData,
  CarsData,
  lang
}: {
  CategoriesData: [];
  CarsData: [];
  lang:string
}) {
  const t = useTranslations("Home");

  return (
    <>
      <Head>
        <title>Asfarco Group — Home Page</title>
        <meta name="title" content={`Asfarco Group — Home Page`} />
        {/* <meta name="description" content={data?.description} /> */}
        <link
          rel="icon"
          href="https://admin.asfarcogroup.com/assets/LogoAsfarco.4dd98ab3.svg"
        />
        {/* <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
        />
        <meta property="og:title" content={`Asfarco Group — ${data?.name}`} />
        <meta property="og:description" content={data?.description} />
        <meta property="og:image" content={data?.Images[0]} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
        />
        <meta
          property="twitter:title"
          content={`Asfarco Group — ${data?.name}`}
        />
        <meta property="twitter:description" content={data?.description} />

        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
        /> */}
      </Head>
      <MainHero t={t}/>
      <Brands />
      <ChooseCards t={t}/>
      <OurSpecialCars CategoriesData={CategoriesData} lang={lang} t={t}/>
      <DownloadOurApp t={t}/>
      <FAQ t={t}/>
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: { req: any }) {
    // const CarsData = await GetCarsData();
    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";
    const CategoriesData = await GetCategoriesData(lang);

    return {
      props: {
        messages: (await import(`../messages/${lang}.json`)).default,
        lang,
        CategoriesData,
        CarsData: [],
      },
    };
  }
);
