import { Container, Grid, rem } from "@mantine/core";
import Image from "next/image";
import React from "react";
import classes from "./style.module.scss";
import { withSessionSsr } from "../../../session";
import { useTranslations } from "next-intl";
import ResetPasswordForm from "../../../components/authpages/resetpassword";
import { useMediaQuery } from "@mantine/hooks";
type Props = { messages: any };

const ForgetPasswordPage = ({lang}: any) => {
  const t = useTranslations("Reset");
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Container size="xl" pt={rem(120)}>
      <Grid gutter={rem(80)} pt={0} pb={0} align="center">
        <Grid.Col span={matches ? 12 :6}>
          <ResetPasswordForm t={t} lang={lang} />
        </Grid.Col>
        {!matches && (
          <Grid.Col span={6}>
            <Image
              src={"/assets/images/authimage.jpeg"}
              className={classes.authImage}
              width={1000}
              height={100}
              alt=""
              priority
            />
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
};

export default ForgetPasswordPage;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({
    req,
    locale,
  }: {
    req: any;
    locale: any;
  }) {
    const lang =
      req.session.userLanguage && req.session.userLanguage != undefined
        ? req.session.userLanguage
        : "en";

    return {
      props: {
        messages: (await import(`../../../messages/${lang}.json`)).default,
        lang,
      },
    };
  }
);
