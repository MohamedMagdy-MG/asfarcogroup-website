import { Container, Tabs, Text } from "@mantine/core";
import { withSessionSsr } from "../../session";
import PersonalInformation from "../../components/profile/PersonalInformation";
import Address from "../../components/profile/Address";
import Password from "../../components/profile/Password";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getSession } from "next-auth/react";
import { GetCitiesData, GetNationalityData, ProfileApi } from "../../Services";
import Head from "next/head";
import Payment from "../../components/profile/Payment";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@mantine/hooks";

export default function ProfilePage(props: any) {
  const t = useTranslations("Profile");
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container size={"xl"} mt={110}>
      <Head>
        <title>Asfarco Group — Profile Page</title>
        {/* <meta name="title" content={`Asfarco Group — ${data?.name}`} /> */}
        {/* <meta name="description" content={data?.description} /> */}
        <link
          rel="icon"
          href="https://admin.asfarcogroup.com/assets/LogoAsfarco.4dd98ab3.svg"
        />
      </Head>
      <Text size={matches ? 32 : 48} weight={700} color="#2B2A29">
        {t("title")}
      </Text>
      <Tabs
        defaultValue="1"
        mt={matches ? 40 : 80}
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
          <Tabs.Tab value="1">{t("tap1")}</Tabs.Tab>
          <Tabs.Tab value="2">{t("tap2")}</Tabs.Tab>
          <Tabs.Tab value="3">{t("tap3")}</Tabs.Tab>
          <Tabs.Tab value="4">{t("tap4")}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1" pt="xl">
          <PersonalInformation
            profile={props?.profile?.PersonalInformation}
            nationalityData={props?.nationalityData}
            user={props?.session?.user}
            t={t}
            lang={props.lang}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2" pt="xl">
          <Address
            user={props?.session?.user}
            address={props?.profile?.Address}
            citiesData={props?.citiesData}
            t={t}
            lang={props.lang}
          />
        </Tabs.Panel>
        <Tabs.Panel value="3" pt="xl">
          <Password user={props?.session?.user} t={t} lang={props.lang} />
        </Tabs.Panel>
        <Tabs.Panel value="4" pt="xl">
          <Payment
            user={props?.session?.user}
            payments={props?.profile?.SavedPayments}
            t={t}
            lang={props.lang}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

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
    const nationalityData = await GetNationalityData(lang);
    const profile = await ProfileApi(session?.user, lang);
    const citiesData = await GetCitiesData(session?.user, lang);

    return {
      props: {
        profile,
        nationalityData,
        citiesData,
        session,
        messages: (await import(`../../messages/${lang}.json`)).default,
        lang,
      },
    };
  }
);
