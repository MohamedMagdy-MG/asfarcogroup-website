import {
  Accordion,
  BackgroundImage,
  Container,
  Flex,
  Group,
  Overlay,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import React from "react";
import classes from "./styles.module.scss";
import SectionsTitle from "../SectionsTitle";
import { IconPlus } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
type Props = {};

const FAQ = ({ t }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container size={"xl"} mt={matches ? rem(80) : rem(124)}>
      <SectionsTitle title={t("faq_title")} hasColor="" />

      <SimpleGrid
        p={32}
        cols={matches ? 1 : 2}
        verticalSpacing="lg"
        bg={"#F3F0EE"}
        mt={matches ? rem(40) : rem(62)}
        style={{ borderRadius: "8px", gap: matches ? "0px" : "" }}
      >
        <Accordion
          chevron={<IconPlus size="1.5rem" color="#E1561B" />}
          styles={{
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(45deg)",
              },
            },
            control: {
              [":hover"]: {
                backgroundColor: "transparent",
              },
            },
            item: {
              backgroundColor: "#F6F5F5",
              borderRadius: "8px",
              marginBottom: "16px",
              ["&:hover"]: {
                backgroundColor: "#F6F5F5",
              },
            },
          }}
        >
          <Accordion.Item value="flexibility">
            <Accordion.Control>Flexibility</Accordion.Control>
            <Accordion.Panel>
              <Text color="#626260" size={rem(18)} weight={400} lh={rem(25)}>
                Configure components appearance and behavior with vast amount of
                settings or overwrite any part of component styles
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Accordion
          chevron={<IconPlus size="1.5rem" color="#E1561B" />}
          styles={{
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(45deg)",
              },
            },
            item: {
              backgroundColor: "#F6F5F5",
              borderRadius: "8px",
              marginBottom: "16px",
              "&:hover": {
                backgroundColor: "#F6F5F5",
              },
            },
            control: {
              [":hover"]: {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Accordion.Item value="flexibility">
            <Accordion.Control>Flexibility</Accordion.Control>
            <Accordion.Panel>
              Configure components appearance and behavior with vast amount of
              settings or overwrite any part of component styles
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </SimpleGrid>
    </Container>
  );
};

export default FAQ;
