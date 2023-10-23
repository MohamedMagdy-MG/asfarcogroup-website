import { Flex, Image, Text } from "@mantine/core";
import React from "react";

type Props = {};

const SearchLoading = ({ t }: any) => {
  return (
    <Flex align={"center"} justify={"center"} direction={"column"} py={"100px"}>
      <Image src={"/assets/images/search.gif"} width={80} alt="" />
      <Text size={"20px"} mt={"xl"}>
        {t("search_desc")}
      </Text>
    </Flex>
  );
};

export default SearchLoading;
