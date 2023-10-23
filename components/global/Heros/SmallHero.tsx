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
    backgroundImage: "url(/assets/images/smallhero.jpeg)",
    backgroundPositionY: "-280px",
    [theme.fn.smallerThan("md")]: {
      backgroundPositionY: "10px",
    },
    position: "relative",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "143px",
    paddingBottom: "65px",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  searchBox: {
    position: "absolute",
    bottom: "-70px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    [theme.fn.smallerThan("md")]: {
      bottom: "-180px",
      width: "100%",
    },
  },
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    marginRight: `calc(${theme.spacing.xl} * 3)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontWeight: 700,
    lineHeight: 58,
    fontSize: rem(48),
    height: "100%",
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    maxWidth: rem(500),
    fontSize: theme.fontSizes.xl,
    [theme.fn.smallerThan("md")]: {
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

export default function SmallHero({
  noSearch,
  title,
  t,
}: {
  noSearch: boolean;
  title: string;
  t: any;
}) {
  const { classes, theme } = useStyles();
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Text
            align="center"
            size={matches ? 34 : 48}
            weight={700}
            color="#fff"
            pt={rem(42)}
            mb={0}
            mt={"xs"}
          >
            {title}
          </Text>
        </div>
        {!noSearch && (
          <Container size={"lg"} className={classes.searchBox}>
            <Search t={t} />
          </Container>
        )}
      </div>
    </div>
  );
}
