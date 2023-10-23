import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { withSessionSsr } from "../../session";
import SmallHero from "../../components/global/Heros/SmallHero";
import SliderSide from "../../components/details/SliderSide";
import {
  GetCarsDetailsData,
  GetCarsFavouriteData,
} from "../../Services/CarDataServices";
import DetailsSide from "../../components/details/DetailsSide";
import OurTopCars from "../../components/aboutus/OurTopCars";
import { useMediaQuery } from "@mantine/hooks";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function FleetPage({ data, ourCars }: any) {
  const matches = useMediaQuery("(max-width: 600px)");
  const t = useTranslations("Details");

  return (
    <>
      <Head>
        <title>Asfarco Group — {data?.name}</title>
        <meta name="title" content={`Asfarco Group — ${data?.name}`} />
        <meta name="description" content={data?.description_} />
        <link
          rel="icon"
          href="https://admin.asfarcogroup.com/assets/LogoAsfarco.4dd98ab3.svg"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
        />
        <meta property="og:title" content={`Asfarco Group — ${data?.name}`} />
        <meta property="og:description" content={data?.description_} />
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
        <meta property="twitter:description" content={data?.description_} />

        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
        />
      </Head>
      <SmallHero noSearch title="Car Details" t={t} />
      <Container
        size={"xl"}
        bg={"#F9F5F2"}
        p={matches ? rem("20px") : rem("40px")}
        pt={matches ? rem("60px") : rem("40px")}
        mt={matches ? rem("0px") : rem("80px")}
        style={{ borderRadius: "8px" }}
      >
        <SimpleGrid cols={matches ? 1 : 2}>
          <SliderSide data={data} />
          <Flex
            direction={"column"}
            bg={"#F3F0EE"}
            p={matches ? rem("20px") : rem("32px")}
          >
            <DetailsSide data={data} />
          </Flex>
        </SimpleGrid>
      </Container>
      <OurTopCars CarsData={ourCars} t={t} />
    </>
  );
}
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx: any) {
    const { req, query } = ctx;
    if (!query.id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const data = await GetCarsDetailsData(query.id);

    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";
    const ourCars = await GetCarsFavouriteData(lang);

    return {
      props: {
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
        data,
        ourCars,
      },
    };
  }
);
