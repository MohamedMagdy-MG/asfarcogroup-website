import { NextComponentType } from "next";
import React from "react";
import HeaderMegaMenu from "../global/header";
import Footer from "../global/footer";
import { useTranslations } from "next-intl";

type Props = { children: any; lang: string; messages: any; session: any };

const Layout = (props: Props) => {
  const t = useTranslations("Header");

  return (
    <>
      <HeaderMegaMenu t={t} lang={props?.lang} session={props?.session} />
      {props.children}
      <Footer />
    </>
  );
};
export default Layout;
