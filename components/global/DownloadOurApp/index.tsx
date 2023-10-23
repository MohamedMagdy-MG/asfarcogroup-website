import {
  BackgroundImage,
  Container,
  Flex,
  Overlay,
  Text,
  rem,
} from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};

const DownloadOurApp = ({ t }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <BackgroundImage
      src="/assets/images/download.jpeg"
      radius="sm"
      h={matches ? 300 : rem(300)}
      className={classes.card_down}
      mt={rem(124)}
    >
      {" "}
      <Overlay
        color="#000"
        pt={rem(48)}
        pb={rem(48)}
        center
        opacity={0.8}
        gradient="linear-gradient(0deg, rgba(35, 34, 32, 0.80) 0%, rgba(35, 34, 32, 0.80) 100%)"
        zIndex={9}
      >
        <Container size={"xl"} className={classes.textCont}>
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text
              color="#fff"
              size={matches ? rem(24) : rem(40)}
              weight={700}
              lh={matches ? rem(30) : rem(48)}
              align={matches ? "center" : "left"}
            >
              {t("down_title")}
            </Text>
            <Text
              color="#F6F5F5"
              mt={matches ? rem(14) : rem(16)}
              size={rem(18)}
              weight={400}
              lh={matches ? rem(25) : rem(25)}
              align={matches ? "center" : "left"}
            >
              {t("down_desc")}
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              mt={matches ? rem(30) : rem(48)}
              gap={"md"}
            >
              <Image
                src={"/assets/images/googleplay.svg"}
                width={matches ? 150 : 200}
                height={65}
                alt=""
              />
              <Image
                src={"/assets/images/applestore.svg"}
                width={matches ? 150 : 200}
                height={65}
                alt=""
              />
            </Flex>
          </Flex>
        </Container>
      </Overlay>
    </BackgroundImage>
  );
};

export default DownloadOurApp;
