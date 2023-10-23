import {
  Card,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Divider,
  ThemeIcon,
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
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { SaveToFavourite } from "../../../Services/CarDataServices";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import { IconExclamationMark } from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.sm,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  label: {
    lineHeight: 1,
  },

  section: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    height: "100px",
    [theme.fn.smallerThan("md")]: {
      height: "auto",
    },
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
  titleCar: {
    cursor: "pointer",
  },
  favIcon: {
    position: "absolute",
    top: "20px",
    right: "20px",
    "&:hover": {
      background: "#00000083",
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

export default function FeaturesCard({ data, t, GetCars }: any) {
  const { data: session }: any = useSession();
  const { classes, theme } = useStyles();
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 600px)");

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
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        {data?.CoverImage && (
          <Image
            src={data?.CoverImage}
            fill
            alt="Tesla Model S"
            className={cssclasses.carImage}
          />
        )}
        <ActionIcon
          size={"md"}
          bg={"#00000083"}
          className={classes.favIcon}
          onClick={saveToFav}
        >
          <IconHeart size={rem("32px")} color="#ffffff" />
        </ActionIcon>
      </Card.Section>

      <Group mt="md">
        <div>
          <Text
            className={classes.titleCar}
            fw={700}
            fz={"xl"}
            c="#2B2A29"
            onClick={() => router.push(`/details?id=${data?.id}`)}
          >
            {data?.name?.length > 36
              ? data?.name?.substring(0, 35) + "..."
              : data?.name}
          </Text>
        </div>
      </Group>

      <Group spacing={"xs"} mt="md" mb="md">
        <Text w={"100%"} fz="xs" fw={400} c="#6D6D6D" className={classes.label}>
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
            {t("AED")} {data?.StaticFeatures?.airport_transfer_service_price}
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
        {data?.StaticFeatures?.deliver_to_my_location == 0 &&
          data?.AdditionalFeatures.slice(0, 3)?.map((name: any) =>
            name.price == 0 ? (
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
            ) : (
              <Group key={name} spacing={5} mb={9}>
                <ThemeIcon radius="xl" size="xs" color="orange.6">
                  <IconExclamationMark
                    stroke={3}
                    style={{ width: "70%", height: "70%" }}
                  />
                </ThemeIcon>
                <Text fz="sm" fw={700} color="#626260" sx={{ lineHeight: 1 }}>
                  {name.name} {t("AED")} {name.price}
                </Text>
              </Group>
            )
          )}

        {data?.StaticFeatures?.deliver_to_my_location !== 0 &&
          data?.AdditionalFeatures.length >= 2 &&
          data?.AdditionalFeatures.slice(1)?.map((name: any) =>
            name.price == 0 ? (
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
            ) : (
              <Group key={name} spacing={5} mb={9}>
                <ThemeIcon radius="xl" size="xs" color="orange.6">
                  <IconExclamationMark
                    stroke={3}
                    style={{ width: "70%", height: "70%" }}
                  />
                </ThemeIcon>
                <Text fz="sm" fw={700} color="#626260" sx={{ lineHeight: 1 }}>
                  {name.name} {t("AED")} {name.price}
                </Text>
              </Group>
            )
          )}
        {data?.StaticFeatures?.deliver_to_my_location !== 0 &&
          data?.AdditionalFeatures.length == 1 &&
          data?.AdditionalFeatures?.map((name: any) =>
            name.price == 0 ? (
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
            ) : (
              <Group key={name} spacing={5} mb={9}>
                <ThemeIcon radius="xl" size="xs" color="orange.6">
                  <IconExclamationMark
                    stroke={3}
                    style={{ width: "70%", height: "70%" }}
                  />
                </ThemeIcon>
                <Text fz="sm" fw={700} color="#626260" sx={{ lineHeight: 1 }}>
                  {name.name} {t("AED")} {name.price}
                </Text>
              </Group>
            )
          )}
        {data?.StaticFeatures?.deliver_to_my_location !== 0 && (
          <Group spacing={5} mb={9}>
            <ThemeIcon radius="xl" size="xs" color="orange.6">
              <IconExclamationMark
                stroke={3}
                style={{ width: "70%", height: "70%" }}
              />
            </ThemeIcon>
            <Text fz="sm" fw={700} color="#626260" sx={{ lineHeight: 1 }}>
              {t("deliver")}{" "}
              {data?.StaticFeatures?.deliver_to_my_location_price}
            </Text>
          </Group>
        )}
      </div>

      <Divider mt="lg" mb="xs" color="#E5E5E5" />

      <Card.Section className={classes.section}>
        <Group
          spacing={20}
          noWrap={matches ? false : true}
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
          <Group spacing={8} noWrap w={matches ? "100%" : "auto"}>
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
              w={matches ? "80%" : "136px"}
              p={0}
              size="lg"
            >
              {t("res_title")}
            </Button>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
