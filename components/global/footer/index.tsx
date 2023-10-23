import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandDribbble,
  IconBrandFigma,
  IconBrandWhatsapp,
  IconPhoneCall,
  IconMail,
  IconBrandTwitterFilled,
  IconBrandLinkedin,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(100),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,
    backgroundColor: theme.colors.blk[6],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: rem(480),
    marginTop: "30px",
    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(50),
    fontWeight: 400,
    color: "#D2D0CF",
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    textDecoration: "none",
    display: "block",
    color: "#D2D0CF",
    fontSize: theme.fontSizes.md,
    paddingTop: rem(3),
    paddingBottom: rem(30),
    fontWeight: 400,
    transition: "all 0.2s linear",
    "&:hover": {
      color: theme.colors.orange[6],
    },
  },

  linkActive: {
    color: theme.colors.orange[6] + "!important",
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    width: "300px",
    display: "flex",
    gap: "10px",
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    fontColor: theme.colors.white,
  },
  contactInfo: {
    display: "flex",
    gap: "50px",
    marginTop: "30px",
  },
  contactInfoCard: {
    display: "flex",
    gap: "15px",
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

const data = [
  {
    title: "About",
    links: [
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Fleet",
        link: "/fleet",
      },
      {
        label: "Services",
        link: "/services",
      },
      {
        label: "About us",
        link: "#",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "Contact",
        link: "#",
      },
      {
        label: "Privacy policy",
        link: "#",
      },
      {
        label: "Terms of Use",
        link: "#",
      },
    ],
  },
];

export default function Footer() {
  const { classes } = useStyles();
  const router = useRouter();

  function isLinkActive(href: string) {
    return router.pathname === href;
  }

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link
        key={index}
        href={link.link}
        className={`${classes.link} ${
          isLinkActive(link.link) ? classes.linkActive : ""
        }`}
      >
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size={"xl"} className={classes.inner}>
        <div className={classes.logo}>
          <Image
            src={"/assets/images/Logo.svg"}
            width={95}
            height={65}
            alt="asfarco logo"
          />
          <Text size="md" className={classes.description}>
            We ara a lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Text>
          <div className={classes.contactInfo}>
            <div className={classes.contactInfoCard}>
              <span className={classes.socialIcons}>
                <IconPhoneCall size={22} stroke={2} color="#ffffff" />
              </span>
              <div>
                <Text c="#8C8C8C" size={"sm"} weight={400}>
                  Have a question?
                </Text>
                <Text c="white" size={"sm"} weight={700}>
                  310-437-2766
                </Text>
              </div>
            </div>
            <div className={classes.contactInfoCard}>
              <span className={classes.socialIcons}>
                <IconMail size={22} stroke={2} color="#ffffff" />
              </span>
              <div>
                <Text c="#8C8C8C" size={"sm"} weight={400}>
                  Contact us at
                </Text>
                <Text c="white" size={"sm"} weight={700}>
                  unreal@outlook.com
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.groups}>{groups}</div>
        <div className={classes.social}>
          <a
            href="https://api.whatsapp.com/send?phone=01555260606"
            target="_blank"
          >
            <ThemeIcon color="#25D366" size={"xl"}>
              <IconBrandWhatsapp style={{ width: "80%", height: "80%" }} />
            </ThemeIcon>
          </a>
          <a href="#" target="_blank">
            <ThemeIcon color="#1877F2" size={"xl"}>
              <IconBrandFacebook style={{ width: "80%", height: "80%" }} />
            </ThemeIcon>
          </a>
          <a href="#" target="_blank">
            <ThemeIcon color="#1DA1F2" size={"xl"}>
              <IconBrandTwitterFilled size={25} />
            </ThemeIcon>
          </a>
          <a href="#" target="_blank">
            <ThemeIcon color="#F00073" size={"xl"}>
              <IconBrandInstagram style={{ width: "80%", height: "80%" }} />
            </ThemeIcon>
          </a>
          <a href="#" target="_blank">
            <ThemeIcon color="#2867B2" size={"xl"}>
              <IconBrandLinkedin size={25} />
            </ThemeIcon>
          </a>
          <a href="#" target="_blank">
            <ThemeIcon color="#FF0000" size={"xl"}>
              <IconBrandYoutubeFilled size={25} />
            </ThemeIcon>
          </a>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2000-2021, All Rights Reserved.
        </Text>
      </Container>
    </footer>
  );
}
