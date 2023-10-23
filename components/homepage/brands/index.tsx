import { Container, Group } from "@mantine/core";
import Image from "next/image";
import React from "react";
import classes from "./styles.module.scss";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};

const Brands = (props: Props) => {

  return (
    <Container mt={80} size={"xl"}>
      <Group position="apart" className={classes.images_container}>
        <Image
          src={"/assets/images/brands/Porsche.png"}
          className={classes.brand_img}
          width={100}
          height={60}
          alt=""
        />
        <Image
          src={"/assets/images/brands/Tesla.png"}
          className={classes.brand_img}
          width={100}
          height={100}
          alt=""
        />
        <Image
          src={"/assets/images/brands/Toyota.png"}
          className={classes.brand_img}
          width={100}
          height={60}
          alt=""
        />
        <Image
          src={"/assets/images/brands/Acura.png"}
          className={classes.brand_img}
          width={100}
          height={50}
          alt=""
        />
        <Image
          src={"/assets/images/brands/audi.png"}
          className={classes.brand_img}
          width={100}
          height={60}
          alt=""
        />
        <Image
          src={"/assets/images/brands/Hyundai.png"}
          className={classes.brand_img}
          width={179}
          height={100}
          alt=""
        />
        <Image
          src={"/assets/images/brands/Mercedes.png"}
          className={classes.brand_img}
          width={224}
          height={60}
          alt=""
        />
      </Group>
    </Container>
  );
};

export default Brands;
