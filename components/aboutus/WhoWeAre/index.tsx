import {
  BackgroundImage,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import React from "react";
import SectionsTitle from "../../global/SectionsTitle";
import classes from "./styles.module.scss";
import {
  IconCalendarCheck,
  IconCalendarDue,
  IconCar,
  IconMapPinFilled,
  IconSteeringWheel,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};

const WhoWeAre = ({ t, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container fluid p={0} mt={rem(124)} className={classes.container}>
      <SectionsTitle title={t("who_title")} hasColor={""} />
      <SimpleGrid
        cols={matches ? 1 : 2}
        spacing={32}
        pl={matches ? 20 : 0}
        mt={62}
        pr={matches ? 0 : 100}
        bg={"#232220"}
      >
        <BackgroundImage src="/assets/images/whoweare.png" />
        <Text
          size={18}
          weight={400}
          color="#F3F0EE"
          pt={40}
          pb={matches ? 80 : 300}
        >
          <b>{t("ASFARCO")}</b> {t("about_desc")}
        </Text>
      </SimpleGrid>
      <Container size={"xl"} bg={"#282726"} className={classes.cardContainer}>
        <Flex
          justify={"center"}
          align={"center"}
          direction={matches ? "column" : "row"}
          gap={rem(16)}
        >
          <Flex justify={"center"} align={"center"} direction="column">
            <IconCalendarDue size={74} color="#E1561B" />
            <Text fz={rem(24)} c={"#ffffff"} fw={700} lh={rem(29)} mt={rem(24)}>
              {t("card1_title")}
            </Text>
            <Text
              fz={rem(18)}
              fw={400}
              lh={rem(25)}
              mt={rem(16)}
              c={"#D2D0CF"}
              align="center"
              w={matches ? "100%" : 380}
            >
              {t("card1_desc")}
            </Text>
          </Flex>
          <Divider orientation="vertical" color="#626260" px={8} />
          <Flex
            // p={rem(16)}
            justify={"center"}
            align={"center"}
            direction="column"
            bg={"#282726"}
          >
            <IconMapPinFilled size={96} style={{ color: "#E1561B" }} />
            <Text fz={rem(24)} c={"#ffffff"} fw={700} lh={rem(29)} mt={rem(24)}>
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
              w={matches ? "100%" : 380}
            >
              {t("card2_desc")}
            </Text>
          </Flex>
          <Divider orientation="vertical" color="#626260" px={8} />
          <Flex
            // p={rem(16)}
            direction="column"
            justify={"center"}
            align={"center"}
          >
            <IconSteeringWheel size={96} color="#E1561B" />
            <Text fz={rem(24)} c={"#ffffff"} fw={700} lh={rem(29)} mt={rem(24)}>
              {t("card3_title")}
            </Text>
            <Text
              size={rem(18)}
              fw={400}
              lh={rem(25)}
              mt={rem(16)}
              c={"#D2D0CF"}
              align="center"
              w={matches ? "100%" : 380}
            >
              {t("card3_desc")}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Container>
  );
};

export default WhoWeAre;
