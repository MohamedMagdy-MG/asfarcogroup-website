import { getSession } from "next-auth/react";
import React from "react";
import { withSessionSsr } from "../../session";
import { Container, Tabs, Text } from "@mantine/core";
import { Tab } from "@mui/material";
import Pending from "../../components/reservation/Pending";

type Props = {};

const ResevationPage = (props: Props) => {
  return (
    <Container size={"xl"} mt={110}>
      <Text size={48} weight={700} color="#2B2A29">
        Reservations
      </Text>
      <Tabs
        defaultValue="1"
        mt={80}
        color="orange.6"
        styles={(theme) => ({
          tabLabel: {
            fontSize: theme.fontSizes.md,
            fontWeight: 400,
            color: "#626260",
          },
          tab: {
            ["&:hover"]: {
              background: "transparent",
            },
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Pending</Tabs.Tab>
          <Tabs.Tab value="2">Ongoing</Tabs.Tab>
          <Tabs.Tab value="3">Completed</Tabs.Tab>
          <Tabs.Tab value="4">Cancelled</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1" pt="64px">
          <Pending />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ResevationPage;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const lang =
      context.req.session.userLanguage &&
      context.req.session.userLanguage != undefined
        ? context.req.session.userLanguage
        : "en";
    return {
      props: {
        session,
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
      },
    };
  }
);
