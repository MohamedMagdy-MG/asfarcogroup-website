import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  rem,
} from "@mantine/core";
import { withSessionSsr } from "../../session";
import SmallHero from "../../components/global/Heros/SmallHero";
import Filter from "../../components/fleet/Filter";
import {
  GetCarsBrandsData,
  GetCarsCategoryData,
  GetCarsColorData,
  GetCarsFeatureData,
  GetCarsFuelData,
  GetCarsYearData,
  GetFleetCarsData,
} from "../../Services/FleetServices";
import HCarCard from "../../components/global/HCarCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchLoading from "../../components/global/SearchLoading";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";
import FeaturesCard from "../../components/global/CarCard";

export default function FleetPage({
  carBrands,
  carYear,
  carCategory,
  carColors,
  carFuels,
  carFeatures,
  query,
  lang,
}: any) {
  const [filter, setFilter] = useState({
    price: [0, 10000],
    category: [],
    brand: [],
    year: [],
    color: [],
    fuel_type: [],
    features: [],
    passengers: [],
    luggae: [],
    transmission: [],
  });
  const matches = useMediaQuery("(max-width: 600px)");
  const t = useTranslations("Fleet");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const convertToQuery = (items: any, key: string) => {
    return items
      .map((item: string, i: number) => `&${key}[${i}]=${item}`)
      .join("");
  };

  const GetCarsData = async (filter: string, lang: any) => {
    setLoading(true);
    const res: any = await GetFleetCarsData(filter, 1, lang);
    setData((data) => res.Cars);
    setTotal(res.Pagination.totalPages);
    setPage(1);
    setLoading(false);
  };

  const GetNextCarsData = async () => {
    const res: any = await GetFleetCarsData("", page + 1, lang);
    setData((cars) => cars.concat(res.Cars));
    setTotal(res.Pagination.totalPages);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const category = convertToQuery(filter.category, "category");
    const brand = convertToQuery(filter.brand, "brand");
    const year = convertToQuery(filter.year, "year");
    const color = convertToQuery(filter.color, "color");
    const fuel_type = convertToQuery(filter.fuel_type, "fuel_type");
    const features = convertToQuery(filter.features, "features");
    const passengers = convertToQuery(filter.passengers, "passengers");
    const luggae = convertToQuery(filter.luggae, "luggae");
    GetCarsData(
      `start_date=${query?.pick ? query.pick : ""}&return_date=${
        query?.return ? query.return : ""
      }&price[0]=${filter.price[0]}&price[1]=${
        filter.price[1]
      }${category}${brand}${year}${fuel_type}${color}${features}${passengers}${luggae}`,
      lang
    );
  }, [filter, query]);

  return (
    <>
      <SmallHero noSearch={false} title={t("title")} t={t} />
      <Container size={"xl"}>
        <Grid mt={matches ? rem("200") : rem(165)} gutter={25}>
          <Grid.Col span={matches ? 12 : 3}>
            <Filter
              carBrands={carBrands}
              carYear={carYear}
              carCategory={carCategory}
              carColors={carColors}
              carFuels={carFuels}
              carFeatures={carFeatures}
              filter={filter}
              setFilter={setFilter}
              t={t}
            />
          </Grid.Col>

          <Grid.Col span={matches ? 12 : 9}>
            {loading && <SearchLoading t={t} />}
            {!loading && data.length == 0 && (
              <Image
                style={{ width: "70%", objectFit: "contain", margin: "auto" }}
                src={"/assets/images/search.svg"}
                alt=""
              />
            )}
            {!loading && data.length !== 0
              ? data.map((car, i) =>
                  matches ? (
                    <Flex mb={20} key={i}>
                      <FeaturesCard key={i} data={car} t={t} />
                    </Flex>
                  ) : (
                    <HCarCard key={i} data={car} t={t} />
                  )
                )
              : null}
            {!loading && data.length !== 0 && page < total && (
              <Flex align={"center"} justify={"center"} mt={"48px"}>
                <Button
                  variant="outline"
                  loading={loading}
                  color="dark.5"
                  w={"340px"}
                  h={"48px"}
                  size="18px"
                  fw={700}
                  onClick={GetNextCarsData}
                >
                  {t("load_title")}
                </Button>
              </Flex>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }: any) {
    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";

    const carBrands = await GetCarsBrandsData(lang);
    const carYear = await GetCarsYearData(lang);
    const carCategory = await GetCarsCategoryData(lang);
    const carColors = await GetCarsColorData(lang);
    const carFuels = await GetCarsFuelData(lang);
    const carFeatures = await GetCarsFeatureData(lang);

    return {
      props: {
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
        carBrands,
        carYear,
        carCategory,
        carColors,
        carFuels,
        carFeatures,
        query,
      },
    };
  }
);
