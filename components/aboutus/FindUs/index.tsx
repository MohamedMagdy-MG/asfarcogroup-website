import {
  BackgroundImage,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import React from "react";
import SectionsTitle from "../../global/SectionsTitle";
import { IconPhoneCall } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

type Props = {};

const FindUs = ({ t, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");
  console.log(lang);

  return (
    <Container fluid p={0} mt={matches ? 80 : rem(150)}>
      <SectionsTitle title={t("find_title")} hasColor={""} />
      <SimpleGrid
        cols={matches ? 1 : 2}
        spacing={32}
        mt={62}
        pl={matches ? 20 : 100}
        pr={matches ? 20 : !matches && lang == "ar" ? 0 : 0}
        pt={matches ? 40 : 0}
        pb={matches ? 40 : 0}
        bg={"#232220"}
      >
        <Flex direction={"column"} py={matches ? 0 : 40}>
          <div>
            <Text size={24} weight={700} color="#F6F5F5">
              Branch name
            </Text>
            <Text mt={24} size={18} weight={400} color="#F6F5F5">
              Address:{" "}
              <b>
                1501, Bayswater Tower, Marasi Drive, Business Bay, Dubai, UAE
              </b>
            </Text>
            <Group spacing={8} mt={16}>
              <IconPhoneCall color="#D2D0CF" />
              <Text size={18} weight={700} color="#F6F5F5">
                310-437-2766
              </Text>
            </Group>
          </div>
          <Divider my={24} color="#626260" />
          <div>
            <Text size={24} weight={700} color="#F6F5F5">
              Branch name
            </Text>
            <Text mt={24} size={18} weight={400} color="#F6F5F5">
              Address:{" "}
              <b>
                1501, Bayswater Tower, Marasi Drive, Business Bay, Dubai, UAE
              </b>
            </Text>
            <Group spacing={8} mt={16}>
              <IconPhoneCall color="#D2D0CF" />
              <Text size={18} weight={700} color="#F6F5F5">
                310-437-2766
              </Text>
            </Group>
          </div>
          <Divider my={24} color="#626260" />
          <div>
            <Text size={24} weight={700} color="#F6F5F5">
              Branch name
            </Text>
            <Text mt={24} size={18} weight={400} color="#F6F5F5">
              Address:{" "}
              <b>
                1501, Bayswater Tower, Marasi Drive, Business Bay, Dubai, UAE
              </b>
            </Text>
            <Group spacing={8} mt={16}>
              <IconPhoneCall color="#D2D0CF" />
              <Text size={18} weight={700} color="#F6F5F5">
                310-437-2766
              </Text>
            </Group>
          </div>
          <Divider my={24} color="#626260" />
          <div>
            <Text size={24} weight={700} color="#F6F5F5">
              Branch name
            </Text>
            <Text mt={24} size={18} weight={400} color="#F6F5F5">
              Address:{" "}
              <b>
                1501, Bayswater Tower, Marasi Drive, Business Bay, Dubai, UAE
              </b>
            </Text>
            <Group spacing={8} mt={16}>
              <IconPhoneCall color="#D2D0CF" />
              <Text size={18} weight={700} color="#F6F5F5">
                310-437-2766
              </Text>
            </Group>
          </div>
        </Flex>
        <iframe
          width={"100%"}
          height={matches ? "300px" : "100%"}
          src="https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sGarden+Boulevard+-+alfurjan+-+Dubai+-+UAE!5e0!6i17"
        />
      </SimpleGrid>
    </Container>
  );
};

export default FindUs;
