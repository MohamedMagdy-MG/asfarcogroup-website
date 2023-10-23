import { Button, Container, Grid, Group, Image, rem } from "@mantine/core";
import React, { useEffect, useState } from "react";
import SectionsTitle from "../../global/SectionsTitle";
import FeaturesCard from "../../global/CarCard";
import CategorySelector from "../CategorySelector";
import { GetCarsData } from "../../../Services/CarDataServices";
import SearchLoading from "../../global/SearchLoading";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";

const OurSpecialCars = ({ CategoriesData, lang, t }: any) => {
  const [carsData, setCarData] = useState([]);
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 600px)");

  const [selectedCategory, setSelectedCategory] = useState(
    CategoriesData[0]?.name
  );
  const [loading, setLoading] = useState(false);

  const getCarData = async () => {
    setLoading(true);
    let data = await GetCarsData(selectedCategory, lang);
    setCarData((items) => data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCategory) {
      getCarData();
    }
  }, [selectedCategory]);

  return (
    <Container size={"xl"} mt={matches ? rem(80) : rem(124)}>
      <SectionsTitle
        title={t("special_title")}
        hasColor={t("special_colored_title")}
      />
      <CategorySelector
        CategoriesData={CategoriesData}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {loading && <SearchLoading t={t} />}
      <Grid mt={rem(48)} gutter={rem(16)}>
        {!loading &&
          carsData.map((item, i) => (
            <Grid.Col key={i} xl={4} lg={4} md={6} sm={6} xs={12}>
              <FeaturesCard data={item} t={t} />
            </Grid.Col>
          ))}
      </Grid>
      {!loading && (
        <Group align="center" position="center" mt={rem(48)}>
          <Button
            radius="sm"
            color="orange.6"
            h={"48px"}
            w={"280px"}
            p={0}
            size="md"
            onClick={() => router.push("/fleet")}
          >
            {t("go_title")}
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default OurSpecialCars;
