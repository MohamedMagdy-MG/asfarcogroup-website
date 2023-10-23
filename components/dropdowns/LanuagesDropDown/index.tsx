import { useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
  rem,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const data = [
  { label: "English", image: "/assets/images/langs/english.png" },
  { label: "عربي", image: "/assets/images/langs/arabic.png" },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: rem(124),
    height: rem(48),
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: rem(10),
    borderRadius: theme.radius.md,
    fontWeight: 600,
    transition: "background-color 150ms ease",
    color: theme.colors.white,
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    color: "#fff",
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    color: "#fff",
  },
  drop: {
    background: "#F6F5F5",
  },
}));

export default function LanguagePicker({ lang }: { lang: string }) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(lang === "en" ? data[0] : data[1]);
  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} alt="flag" />}
      onClick={() => switchlang(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const switchlang = (item: { label: string; image: string }) => {
    if (item.label !== selected.label) {
      setSelected(item);
      fetch("/api/lang", {
        method: "POST",
        body: JSON.stringify({
          language: item.label == "English" ? "en" : "ar",
        }),
      })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => console.error("Error setting language:", error));
    }
  };

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs" position="right">
            <Image src={selected.image} width={22} height={22} alt="flag" />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.drop}>{items}</Menu.Dropdown>
    </Menu>
  );
}
