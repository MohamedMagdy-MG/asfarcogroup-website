import React from "react";
import {
  Popover,
  Text,
  Group,
  Menu,
  rem,
  createStyles,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronRight,
  IconClock2,
  IconExternalLink,
} from "@tabler/icons-react";
type Props = { color: string };

const useStyles = createStyles((theme) => ({
  label: {
    color: "#2B2A29",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "20.8px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  item: {
    fontSize: rem(18),
    fontWeight: 400,
    color: "#626260",
    "&:hover": {
      background: "#FFE8D5",
    },
  },
}));

const BookingMode = (props: Props) => {
  const { classes, theme } = useStyles();

  return (
    <Menu width={280} shadow="md" offset={20}>
      <Menu.Target>
        <Group
          position="apart"
          spacing={"xl"}
          style={{ cursor: "pointer", width: "280px" }}
          noWrap
        >
          
          <Group noWrap position="left" mr={30} spacing={"xs"}>
            <IconClock2 color="#706C6A" size={20} />
            <Text color="#706C6A" fs={"18px"} weight={700} style={{whiteSpace: "nowrap"}}>
              Booking Mode
            </Text>
          </Group>
          <IconChevronRight color="#706C6A" />
        </Group>
      </Menu.Target>

      <Menu.Dropdown bg="#F6F5F5">
        <Menu.Label className={classes.label}>Booking type</Menu.Label>
        <Menu.Item className={classes.item}>Daily</Menu.Item>
        <Menu.Item className={classes.item}>
          <Group grow noWrap>
            <Text>Weekly</Text>
            <Group noWrap spacing={"xs"}>
              <ThemeIcon radius="xl" size="sm" color="#13CE66">
                <IconCheck stroke={3} style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text fz={rem(14)} style={{whiteSpace: "nowrap"}} fw={700} color="#2B2A29">
                Free delivery
              </Text>
            </Group>
          </Group>
        </Menu.Item>

        <Menu.Item className={classes.item}>
          <Group grow noWrap>
            <Text>Monthly</Text>
            <Group noWrap spacing={"xs"}>
              <ThemeIcon radius="xl" size="sm" color="#13CE66">
                <IconCheck stroke={3} style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text fz={rem(14)} style={{whiteSpace: "nowrap"}} fw={700} color="#2B2A29">
                15% off
              </Text>
            </Group>
          </Group>
        </Menu.Item>

        <Menu.Item className={classes.item}>
          <Group grow noWrap>
            <Text>Yearly</Text>
            <Group noWrap spacing={"xs"}>
              <ThemeIcon radius="xl" size="sm" color="#13CE66">
                <IconCheck stroke={3} style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text fz={rem(14)} style={{whiteSpace: "nowrap"}} fw={700} color="#2B2A29">
                50% off
              </Text>
            </Group>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default BookingMode;
