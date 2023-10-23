import { Center, Container, Flex, Text, rem } from "@mantine/core";
import React from "react";
import SectionsTitle from "../../global/SectionsTitle";
import {
  IconCalendar,
  IconCalendarCheck,
  IconCar,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

type Props = {};

const ChooseCards = ({ t }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container fluid p={0} mt={matches ? rem("80px") : rem(124)}>
      <SectionsTitle title={t("why_title")} hasColor={t("why_colored_title")} />
      <Container
        fluid
        bg={"#232220"}
        pt={rem(32)}
        pb={rem(32)}
        px={0}
        mt={matches ? rem("40px") : rem(62)}
      >
        <Container size={"xl"}>
          <Flex
            justify={"center"}
            align={"center"}
            direction={matches ? "column" : "row"}
            gap={rem(16)}
          >
            <Flex
              p={rem(16)}
              justify={"center"}
              align={"center"}
              direction="column"
            >
              <IconCalendarCheck size={74} color="#E1561B" />
              <Text
                fz={rem(24)}
                c={"#ffffff"}
                fw={700}
                lh={rem(29)}
                mt={rem(24)}
              >
                {t("card1_title")}
              </Text>
              <Text
                fz={rem(18)}
                fw={400}
                lh={rem(25)}
                mt={rem(16)}
                c={"#D2D0CF"}
                align="center"
              >
                {t("card1_desc")}
              </Text>
            </Flex>
            <Flex
              p={rem(16)}
              justify={"center"}
              align={"center"}
              direction="column"
              bg={"#282726"}
            >
              <IconMapPinFilled size={96} style={{ color: "#E1561B" }} />
              <Text
                fz={rem(24)}
                c={"#ffffff"}
                fw={700}
                lh={rem(29)}
                mt={rem(24)}
              >
                {t("card2_title")}
              </Text>
              <Text
                fz={rem(18)}
                fw={400}
                lh={rem(25)}
                mt={rem(16)}
                c={"#D2D0CF"}
                align="center"
                pb={rem(25)}
              >
                {t("card2_desc")}
              </Text>
            </Flex>
            <Flex
              p={rem(16)}
              direction="column"
              justify={"center"}
              align={"center"}
            >
              <IconCar size={96} color="#E1561B" />
              <Text
                fz={rem(24)}
                c={"#ffffff"}
                fw={700}
                lh={rem(29)}
                mt={rem(24)}
              >
                {t("card3_title")}
              </Text>
              <Text
                fz={rem(18)}
                fw={400}
                lh={rem(25)}
                mt={rem(16)}
                c={"#D2D0CF"}
                align="center"
              >
               {t("card3_desc")}
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Container>
    </Container>
  );
};

export default ChooseCards;
