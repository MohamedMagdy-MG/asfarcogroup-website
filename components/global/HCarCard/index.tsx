import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Divider,
  ThemeIcon,
  Grid,
  ActionIcon,
} from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconCheck,
  IconDoor,
  IconHeart,
  IconLuggage,
  IconPhone,
  IconUsers,
} from "@tabler/icons-react";
import cssclasses from "./FeaturesCard.module.css";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { SaveToFavourite } from "../../../Services/CarDataServices";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    // display: "flex",
    // alignItems: "stretch",
    // justifyContent: "center",
  },

  label: {
    lineHeight: 1,
  },

  section: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },

  icon: {
    marginRight: rem(5),
    color: "#706C6A",
  },
  badge: {
    border: "1px solid #B2AFAE",
    padding: "2px 8px",
    borderRadius: "4px",
  },
  favIcon: {
    position: "absolute",
    top: "20px",
    right: "20px",
    "&:hover": {
      // background: "#00000083",
    },
    [theme.fn.smallerThan("md")]: {
      right: "20px",
    },
  },
}));

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconDoor },
  { label: "Automatic gearbox", icon: IconLuggage },
];

export default function HCarCard({ data, t, GetCars }: any) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature, i) => (
    <Center key={feature.label} className={classes.badge}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs" fw={700} color="#706C6A">
        {i === 0
          ? data?.features?.passengers
          : i === 1
          ? data?.features?.doors
          : data?.features?.luggage}
      </Text>
    </Center>
  ));

  const saveToFav = () => {
    if (!session) {
      notifications.show({
        title: "Favourites Failed",
        message: "Please register or login first!",
        autoClose: true,
        withCloseButton: true,
        color: "red.6",
      });
      return true;
    }
    notifications.show({
      id: "fav-p",
      loading: true,
      title: "Favourites",
      message: "Favourites in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    SaveToFavourite(data?.id, session?.user?.token).then((res) => {
      GetCars && GetCars();
      notifications.update({
        id: "fav-p",
        title: "Favourites Success",
        message: res.message,
        autoClose: true,
        withCloseButton: true,
        color: "green.6",
      });
    });
  };

  return (
    <Card withBorder radius="md" mb={"16px"} className={classes.card}>
      <ActionIcon
        size={"md"}
        bg={"#ffffff83"}
        className={classes.favIcon}
        onClick={saveToFav}
      >
        <IconHeart size={rem("32px")} color="#626260" />
      </ActionIcon>
      <Grid gutter={"20px"}>
        <Grid.Col span={4} pt={0} pb={0} pl={0}>
          <Card.Section className={classes.imageSection}>
            <Image
              src={data?.CoverImage}
              alt="Tesla Model S"
              height="100%"
              className={cssclasses.carImage}
              styles={(theme) => ({
                root: {
                  height: "100%",
                },
                figure: {
                  height: "100%",
                },
                imageWrapper: {
                  height: "100%",
                },
                image: {
                  height: "100%",
                  borderRadius: "8px",
                },
              })}
              fit="cover"
            />
          </Card.Section>
        </Grid.Col>
        <Grid.Col span={8}>
          <Group mt="md">
            <div>
              <Text
                fw={700}
                fz={"xl"}
                c="#2B2A29"
                onClick={() => router.push(`/details?id=${data?.id}`)}
                style={{ cursor: "pointer" }}
              >
                {data?.name}
              </Text>
            </div>
          </Group>

          <Group spacing={"xs"} mt="md" mb="md">
            <Text
              w={"100%"}
              fz="xs"
              fw={400}
              c="#6D6D6D"
              className={classes.label}
            >
              {t("features_title")}
            </Text>

            <Group spacing={8}>
              <Center className={classes.badge}>
                <Text size="xs" fw={700} color="#706C6A">
                  {data?.features?.category}
                </Text>
              </Center>
              {features}
            </Group>
          </Group>
          <Group mt="md" mb={"sm"}>
            <div>
              <Text fz="md" fw={700} color="dark.3" sx={{ lineHeight: 1 }}>
                {t("AED")} {data?.airport_transfer_service}
              </Text>
            </div>
          </Group>

          <Group mb={"md"}>
            <div>
              <Text fz="sm" fw={700} color="#6D6D6D" sx={{ lineHeight: 1 }}>
                {t("airport")}
              </Text>
            </div>
          </Group>

          <Divider mt="lg" mb="md" color="#E5E5E5" />

          <div style={{ height: "66px" }}>
            {data?.AdditionalFeatures?.map((name: any) => (
              <Group key={name} spacing={5} mb={9}>
                <ThemeIcon radius="xl" size="xs" color="#13CE66">
                  <IconCheck
                    stroke={3}
                    style={{ width: "70%", height: "70%" }}
                  />
                </ThemeIcon>
                <Text fz="sm" fw={700} color="#626260" sx={{ lineHeight: 1 }}>
                  {name.name}
                </Text>
              </Group>
            ))}
          </div>

          <Divider mt="lg" mb="xs" color="#E5E5E5" />

          <Card.Section className={classes.section}>
            <Group
              spacing={20}
              noWrap
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div>
                <Text
                  fz="24px"
                  td={data?.Prices?.discount && "line-through"}
                  fw={700}
                  color="orange.6"
                  sx={{ lineHeight: 1 }}
                >
                  {t("AED")} {data?.Prices?.price}
                </Text>
                {data?.Prices?.discount ? (
                  <Text
                    fz="lg"
                    mt={5}
                    mb={5}
                    fw={400}
                    color="#6D6D6D"
                    sx={{ lineHeight: 1 }}
                  >
                    {t("AED")} {data?.Prices?.price_after_discount}
                  </Text>
                ) : null}
                <Text
                  fz="md"
                  color="#B2AFAE"
                  fw={400}
                  sx={{ lineHeight: 1 }}
                  mt={3}
                >
                  per{" "}
                  {data?.Prices?.mode === "daily"
                    ? "day"
                    : data?.Prices?.mode === "weekly"
                    ? "week"
                    : data?.Prices?.mode === "monthly"
                    ? "month"
                    : "year"}
                </Text>
              </div>
              <Group spacing={8} noWrap>
                <a href="tel:+201023762695">
                  {" "}
                  <Button radius="md" color="blk.1" h={"40px"} px={10}>
                    <IconPhone />
                  </Button>{" "}
                </a>
                <a
                  href={`https://wa.me/201023762695?text=${data?.name} - ${process.env.NEXT_PUBLIC_URL}details?id=${data?.id}`}
                  target="_blank"
                >
                  <Button radius="md" color="green.6" px={10} h={"40px"}>
                    <IconBrandWhatsapp />
                  </Button>
                </a>
                <Button
                  radius="sm"
                  color="orange.6"
                  h={"40px"}
                  w={"136px"}
                  p={0}
                  size="lg"
                >
                  {t("res_title")}
                </Button>
              </Group>
            </Group>
          </Card.Section>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
