import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Container,
  ScrollArea,
  rem,
  Menu,
  Avatar,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconCalendarCheck,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LanguagePicker from "../../dropdowns/LanuagesDropDown";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: 200,
  },
  linkLabel: {
    marginRight: rem("5px"),
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: "#B2AFAE",
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
    transition: "all 0.2s linear",
    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    ...theme.fn.hover({
      color: theme.white,
    }),
  },
  activeLink: {
    color: theme.white,
  },
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  loginBtn: {
    fontSize: theme.fontSizes.lg,
    width: "119px",
  },
  user: {
    color: theme.colorScheme === "light" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "light" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  logo: {
    cursor: "pointer",
  },
}));

export default function HeaderMegaMenu({
  lang,
  t,
}: // session,
{
  lang: string;
  t: any;
  session: any;
}) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const router = useRouter();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  function isLinkActive(href: string) {
    return router.pathname === href;
  }
  const { data: session, status, update } = useSession();
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Box pb={0} bg={"blk.6"} className={classes.root}>
      <Container size={"xl"}>
        <Header height={matches ? 75 : 85} bg={"blk.6"} withBorder={false}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Image
              src={"/assets/images/Logo.svg"}
              width={matches ? 60 : 85}
              height={matches ? 60 : 85}
              alt="asfarco logo"
              className={classes.logo}
              onClick={() => router.push("/")}
            />
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Link
                href="/"
                className={`${classes.link} ${
                  isLinkActive("/") ? classes.activeLink : ""
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="/fleet"
                className={`${classes.link} ${
                  isLinkActive("/fleet") ? classes.activeLink : ""
                }`}
              >
                {t("fleet")}
              </Link>
              <Link
                href="/aboutus"
                className={`${classes.link} ${
                  isLinkActive("/aboutus") ? classes.activeLink : ""
                }`}
              >
                {t("about")}
              </Link>
            </Group>

            <Group className={classes.hiddenMobile} spacing={20}>
              {session ? (
                <Menu
                  width={200}
                  position="bottom"
                  transitionProps={{ transition: "pop" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton className={cx(classes.user)}>
                      <Group spacing={8} position="apart">
                        <Avatar
                          src={session?.user?.image}
                          alt={""}
                          radius="xl"
                          size={32}
                        />
                        <Text weight={400} size={rem(16)} color="#fff">
                          {session?.user?.name}
                        </Text>
                        <IconChevronDown
                          size={rem(20)}
                          color="#fff"
                          stroke={2}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => router.push("profile")}
                      icon={<IconUser size="1rem" stroke={1.5} />}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("favourites")}
                      icon={<IconHeart size="1rem" stroke={1.5} />}
                    >
                      Favourite
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("reservation")}
                      icon={<IconCalendarCheck size="1rem" stroke={1.5} />}
                    >
                      Reservations
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      icon={<IconLogout size="0.9rem" stroke={1.5} />}
                      onClick={() =>
                        signOut({ redirect: false }).then(() => {
                          router.push("/");
                        })
                      }
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  color="orange.6"
                  h={"48px"}
                  w={lang == "ar" ? rem(130) : rem(120)}
                  className={classes.loginBtn}
                  onClick={() => router.push("/auth/login")}
                >
                  {t("login")}
                </Button>
              )}
              <LanguagePicker lang={lang} />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
              color="#F3F0EE"
            />
          </Group>
        </Header>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Image
            src={"/assets/images/Logo.svg"}
            width={60}
            height={60}
            alt="asfarco logo"
            className={classes.logo}
            onClick={() => router.push("/")}
          />
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
        styles={(theme) => ({
          header: {
            background: theme.colors.blk[6],
            color: "white",
            borderBottom: "1px solid #313131",
            padding: "10px 20px",
          },
          close: {
            color: "white",
            fontSize: "30px",
           
          },
          body: {
            background: theme.colors.blk[6],
          },
        })}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} pt={10} mx="-md">
          <Link
            href="/"
            onClick={toggleDrawer}
            className={`${classes.link} ${
              isLinkActive("/") ? classes.activeLink : ""
            }`}
          >
            {t("home")}
          </Link>
          <Link
            onClick={toggleDrawer}
            href="/fleet"
            className={`${classes.link} ${
              isLinkActive("/fleet") ? classes.activeLink : ""
            }`}
          >
            {t("fleet")}
          </Link>

          <Link
            onClick={toggleDrawer}
            href="/aboutus"
            className={`${classes.link} ${
              isLinkActive("/aboutus") ? classes.activeLink : ""
            }`}
          >
            {t("about")}
          </Link>
          {session && (
            <Link
              onClick={toggleDrawer}
              href="/profile"
              className={`${classes.link} ${
                isLinkActive("/profile") ? classes.activeLink : ""
              }`}
            >
              {t("profile")}
            </Link>
          )}
          {session && (
            <Link
              onClick={toggleDrawer}
              href="/favourites"
              className={`${classes.link} ${
                isLinkActive("/favourites") ? classes.activeLink : ""
              }`}
            >
              {t("favourites")}
            </Link>
          )}

          <Divider my="sm" color={"dark.5"} />

          <Group position="center" grow pb="xl" px="md">
            <Button color="orange.6">Log in</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
