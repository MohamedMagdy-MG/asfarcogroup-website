import React from "react";
import ReservationCard from "../ReservationCard";
import { Flex } from "@mantine/core";

type Props = {};

const Pending = (props: Props) => {
  return (
    <Flex direction={"column"} gap={"16px"}>
      <ReservationCard />
      <ReservationCard />
      <ReservationCard />
    </Flex>
  );
};

export default Pending;
