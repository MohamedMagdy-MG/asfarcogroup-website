import {
  Button,
  Center,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  Text,
  ThemeIcon,
  createStyles,
  rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandWhatsapp,
  IconCheck,
  IconDoor,
  IconExclamationMark,
  IconGasStation,
  IconLuggage,
  IconMapPin,
  IconPhone,
  IconPlaneTilt,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";
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
}));

const mockdata = [
  { label: "4 passengers", icon: IconUsers },
  { label: "100 km/h in 4 seconds", icon: IconDoor },
  { label: "Automatic gearbox", icon: IconLuggage },
  { label: "IconGasStation", icon: IconGasStation },
];

type Props = {};

const DetailsSide = ({ data }: any) => {
  const { classes, theme } = useStyles();
  const matches = useMediaQuery("(max-width: 600px)");

  const specs = mockdata.map((feature, i) => (
    <Center key={feature.label} className={classes.badge}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs" fw={700} color="#706C6A">
        {i === 0
          ? data?.CarSpecs?.passengers
          : i === 1
          ? data?.CarSpecs?.doors
          : i === 2
          ? data?.CarSpecs?.luggage
          : data?.CarSpecs?.Fuel}
      </Text>
    </Center>
  ));

  const features = data?.CarFeatures.map((feature: any, i: any) => (
    <Center key={feature.label} className={classes.badge}>
      <Text size="xs" fw={700} color="#706C6A">
        {feature.name}
      </Text>
    </Center>
  ));

  return (
    <>
      <Text size={"md"} weight={700} lh={"xl"} mb={"md"} color="#2B2A29">
        Description
      </Text>
      <Text
        size={matches ? "sm" : "md"}
        weight={400}
        lh={"xl"}
        mb={"xl"}
        color="#626260"
      >
        {data?.description_}
      </Text>
      <Text size={"md"} weight={700} lh={"xl"} mb={"md"} color="#2B2A29">
        Car Colors
      </Text>
      <Group position="left" spacing="xs" mb={"xl"}>
        {data?.CarColors?.map((color: any) => (
          <ColorSwatch key={color?.name} color={color.hexa_code} />
        ))}
      </Group>
      <Text size={"md"} weight={700} lh={"xl"} mb={"md"} color="#2B2A29">
        Car specs
      </Text>
      <Group spacing={8} mb={"xl"}>
        <Center className={classes.badge}>
          <Text size="xs" fw={700} color="#706C6A">
            {data?.CarSpecs?.Category}
          </Text>
        </Center>
        {specs}
      </Group>
      <Text size={"md"} weight={700} lh={"xl"} mb={"md"} color="#2B2A29">
        Car features
      </Text>
      <Group spacing={8}>
        <Center className={classes.badge}>
          <Text size="xs" fw={700} color="#706C6A">
            {data?.CarSpecs?.Category}
          </Text>
        </Center>
        {features}
      </Group>
      <Divider mt="24px" mb="24px" color="#D2D0CF" />
      {data.AdditionalFeatures.map((item: any, i: any) => (
        <Group position="apart" mb={"8px"} key={i}>
          <Flex gap={matches ? "4px" : "8px"}>
            <IconShield size={matches ? "16px" : "24px"} color="#2B2A29" />
            <Text
              size={matches ? "sm" : "md"}
              weight={400}
              lh={"xl"}
              color="#2B2A29"
            >
              {item.name}
            </Text>
          </Flex>
          <Text
            size={matches ? "sm" : "md"}
            weight={700}
            lh={"xl"}
            color="#4C4C52"
          >
            AED {item.price}
          </Text>
        </Group>
      ))}
      {data?.StaticFeatures?.deliver_to_my_location !== 0 && (
        <Group position="apart" mb={"8px"}>
          <Flex gap={matches ? "4px" : "8px"}>
            <IconMapPin size={matches ? "16px" : "24px"} color="#2B2A29" />
            <Text
              size={matches ? "sm" : "md"}
              weight={400}
              lh={"xl"}
              color="#2B2A29"
            >
              Deliver to my location
            </Text>
          </Flex>
          <Text
            size={matches ? "sm" : "md"}
            weight={700}
            lh={"xl"}
            color="#4C4C52"
          >
            AED {data?.StaticFeatures?.deliver_to_my_location_price}
          </Text>
        </Group>
      )}
      {data?.StaticFeatures?.deliver_to_my_location !== 0 && (
        <Group position="apart" mb={"8px"}>
          <Flex gap={"8px"}>
            <IconPlaneTilt
              size={matches ? "16px" : "24px"}
              color="#2B2A29"
              style={{ transform: "rotate(-45deg)" }}
            />
            <Text
              size={matches ? "sm" : "md"}
              weight={400}
              lh={"xl"}
              color="#2B2A29"
            >
              Airport transfer service
            </Text>
          </Flex>
          <Text
            size={matches ? "sm" : "md"}
            weight={700}
            lh={"xl"}
            color="#4C4C52"
          >
            AED {data?.StaticFeatures?.airport_transfer_service_price}
          </Text>
        </Group>
      )}
      <Divider mt="16px" mb="24px" color="#D2D0CF" />
      <Text size={"md"} weight={700} mb={"24px"} lh={"xl"} color="#2B2A29">
        General instructions
      </Text>
      <Group spacing={"8px"} mb={16} noWrap style={{ alignItems: "start" }}>
        <ThemeIcon radius="xl" size={matches ? "sm" : "24px"} color="#13CE66">
          <IconCheck stroke={3} style={{ width: "70%", height: "70%" }} />
        </ThemeIcon>
        <Text
          size={matches ? "sm" : "16px"}
          weight={400}
          color="#2B2A29"
          lh={"20.8px"}
        >
          Travel up to 600 Km during your rental period, and for every extra Km,
          there will be a charge of AED 23.
        </Text>
      </Group>
      <Group spacing={"8px"} noWrap style={{ alignItems: "center" }}>
        <ThemeIcon radius="xl" size={matches ? "sm" : "24px"} color="#E1561B">
          <IconExclamationMark
            stroke={3}
            style={{ width: "70%", height: "70%" }}
          />
        </ThemeIcon>
        <Text
          size={matches ? "sm" : "16px"}
          weight={400}
          color="#2B2A29"
          lh={"20px"}
        >
          Driver’s age must be +22 years old
        </Text>
      </Group>
      <Divider mt="24px" mb="24px" color="#D2D0CF" />

      <Group spacing={"16px"} noWrap>
        <a href="tel:+201023762695">
          <Button radius="md" color="blk.1" h={"40px"} px={10}>
            <IconPhone />
          </Button>
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
          w={"80%"}
          p={0}
          size="lg"
        >
          Reserve now
        </Button>
      </Group>
    </>
  );
};

export default DetailsSide;
