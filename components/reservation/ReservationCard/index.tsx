import {
  Container,
  Divider,
  Group,
  Text,
  rem,
  Image,
  Flex,
  Badge,
} from "@mantine/core";
import React from "react";
import classes from "./styles.module.css";
import { IconHourglassHigh } from "@tabler/icons-react";

type Props = {};

const ReservationCard = (props: Props) => {
  return (
    <Container fluid p={rem("24px")} className={classes.card}>
      <Group position={"apart"}>
        <Group spacing={"10px"}>
          <IconHourglassHigh />
          <Text size={"18px"} color="#2B2A29" lh={"24px"} weight={500}>
            Estimated return time at friday, 1/9/2023 - 3:30 pm
          </Text>
        </Group>
        <div className={classes.code}>4567863-p</div>
      </Group>
      <Divider color="#E5E5E5" my={"md"} />
      <Group spacing={"16px"}>
        <Image
          src={"/assets/images/download.jpeg"}
          width={"140px"}
          height={"120px"}
          fit="cover"
          alt=""
          radius={"4px"}
        />
        <Flex direction={"column"} gap={"16px"}>
          <Text size={"18px"} color="#2B2A29" lh={"24px"} weight={700}>
            Mercedes Benz GLS 600 Maybach
          </Text>
          <Text size={"18px"} color="#626260" lh={"24px"} weight={400}>
            Daily rent{" "}
            <Badge mx={"sm"} radius="sm" color="orange">
              3 Days
            </Badge>
          </Text>
          <Text size={"32px"} color="orange" lh={"38px"} weight={700}>
            AED 550
          </Text>
        </Flex>
      </Group>
    </Container>
  );
};

export default ReservationCard;
