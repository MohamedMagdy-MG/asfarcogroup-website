import {
  BackgroundImage,
  Container,
  Flex,
  Group,
  Overlay,
  Text,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "./styles.module.scss";
import { useMediaQuery } from "@mantine/hooks";

type Props = { CategoriesData: [] };

const CategorySelector = ({
  CategoriesData,
  setSelectedCategory,
  selectedCategory,
}: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container size={"xl"} mt={matches ? rem(40) : rem(62)} p={0}>
      <Flex gap={rem(8)} align={"center"} justify={"center"} className={classes.category_container}>
        {CategoriesData.map((item: any, i: any) => (
          <BackgroundImage
            key={i}
            src={item?.image}
            radius="sm"
            w={rem(130)}
            h={rem(80)}
            className={classes.card}
            onClick={() => setSelectedCategory(item?.name)}
            data-active={item?.name == selectedCategory ? true : undefined}
          >
            <Overlay zIndex={50} color="#000" opacity={0.3} center>
              <Text color={"#fff"} size={matches ? "sm" : "md"} weight={700}>
                {item?.name}
              </Text>
            </Overlay>
          </BackgroundImage>
        ))}
        
      </Flex>
    </Container>
  );
};

export default CategorySelector;
