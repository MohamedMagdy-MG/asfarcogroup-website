import {
  Container,
  Title,
  Text,
  Button,
  createStyles,
  rem,
} from "@mantine/core";
import Image from "next/image";
import Search from "../Search";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: "url(/assets/images/hero.png)",
    position: "relative",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "95vh",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      height: "550px",
    },
  },

  searchBox: {
    position: "absolute",
    bottom: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    [theme.fn.smallerThan("md")]: {
      bottom: "-39px",
      padding: "0px 20px",
      width: "100%",
    },
  },
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
      paddingTop: "150px",
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1.05,
    fontSize: rem(64),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(38),
      lineHeight: 1,
    },
  },

  description: {
    color: theme.white,
    maxWidth: rem(500),
    fontSize: theme.fontSizes.xl,
    [theme.fn.smallerThan("md")]: {
      fontSize: theme.fontSizes.md,
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  vectorText: {
    position: "relative",
    ["img"]: {
      position: "absolute",
      top: "31% !important",
      left: "9px !important",
      width: "95% !important",
    },
  },
}));

export default function MainHero({ t }: any) {
  const { classes, theme } = useStyles();
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <div className={classes.root}>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text component="div" inherit mb={0}>
                <Text component="span" className={classes.vectorText}>
                  {t("slider_start")}{" "}
                  <Image src={"/assets/images/herovector.svg"} fill alt="" />
                </Text>{" "}
                {t("slider_your")}
              </Text>{" "}
              {t("slider_journy")}
              <Text component="div" inherit mb={0} mt={"xs"}>
                {t("slider_today")}
              </Text>
            </Title>

            <Text className={classes.description} mt={30} color={theme.white}>
              {t("slider_desc")}
            </Text>
          </div>
        </div>
      </Container>

      <Container size={"lg"} px={0} className={classes.searchBox}>
        <Search t={t} />
      </Container>
    </div>
  );
}
