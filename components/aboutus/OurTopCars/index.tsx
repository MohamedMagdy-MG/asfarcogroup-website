import { Button, Container, Grid, Group, rem } from "@mantine/core";
import React from "react";
import SectionsTitle from "../../global/SectionsTitle";
import FeaturesCard from "../../global/CarCard";
import { useMediaQuery } from "@mantine/hooks";

type Props = { CarsData: [] };

const OurTopCars = ({ CarsData, t }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container size={"xl"} mt={matches ? rem(80) : rem(124)}>
      <SectionsTitle title={t("top_title")} hasColor={""} />
      <Grid mt={matches ? rem(30) : rem(48)} gutter={rem(16)}>
        {CarsData?.map((item: any, i: any) => (
          <Grid.Col key={i} xl={4} lg={4} md={6} sm={6} xs={12}>
            <FeaturesCard data={item} t={t} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default OurTopCars;
