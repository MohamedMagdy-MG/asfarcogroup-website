import { Container, Flex, Image, rem } from "@mantine/core";
import {
  GetCarsFavouriteData,
  GetFavouriteData,
} from "../../Services/CarDataServices";
import { withSessionSsr } from "../../session";
import OurTopCars from "../../components/aboutus/OurTopCars";
import HCarCard from "../../components/global/HCarCard";
import SmallHero from "../../components/global/Heros/SmallHero";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import FeaturesCard from "../../components/global/CarCard";
import { useMediaQuery } from "@mantine/hooks";

export default function FavouritesPage({ ourCars, lang }: any) {
  const { data: session, status, update }: any = useSession();
  const matches = useMediaQuery("(max-width: 600px)");
  const t = useTranslations("Fav");
  const [data, setData] = useState([]);
  const GetCars = useCallback(async () => {
    const res = await GetFavouriteData(session?.user?.token);
    setData(res.Cars);
  }, [session]);

  useEffect(() => {
    if (session) {
      GetCars();
    }
  }, [session]);

  return (
    <>
      <SmallHero noSearch title={t("title")} t={t} />
      <Container size={"xl"} mt={rem("80px")}>
        {data.length !== 0 ? (
          data?.map((car: any, i: any) =>
            matches ? (
              <Flex mb={20}  key={i}>
                <FeaturesCard key={i} data={car} t={t} GetCars={GetCars}/>
              </Flex>
            ) : (
              <HCarCard key={i} data={car} t={t} GetCars={GetCars}/>
            )
          )
        ) : (
          <Image src={"/assets/images/all-cars.svg"} alt="" />
        )}
      </Container>
      <OurTopCars CarsData={ourCars} t={t} />
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: { req: any }) {
    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";
    const ourCars = await GetCarsFavouriteData(lang);
    return {
      props: {
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
        ourCars,
      },
    };
  }
);
