import {
  Accordion,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Group,
  RangeSlider,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "./style.module.scss";
import { IconX } from "@tabler/icons-react";
type Props = any;

const Filter = ({
  carBrands,
  carYear,
  carCategory,
  carColors,
  carFuels,
  carFeatures,
  filter,
  setFilter,
  t,
}: Props) => {
  const [price, setPrice]: any = useState([1, 10000]);
  return (
    <Container bg={"#F9F5F2"} className={classes.main} p={rem(24)}>
      <Group position="apart">
        <Text color="#2B2A29" size={rem(20)} weight={400}>
          {t("filter")}:
        </Text>
        <Button
          variant="subtle"
          color="orange.6"
          fz={14}
          fw={400}
          pr={0}
          styles={(theme) => ({
            root: {
              background: "transparent",
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            },
          })}
          onClick={() => (
            setFilter((v: any) => ({
              price: [0, 10000],
              category: [],
              brand: [],
              year: [],
              color: [],
              fuel_type: [],
              features: [],
              passengers: [],
              luggae: [],
              transmission: [],
            })),
            setPrice([0, 10000])
          )}
        >
          <IconX size={18} stroke={2} /> &nbsp;{t("clear_title")}
        </Button>
      </Group>
      <Container p={0} mt={rem(40)}>
        <Text color="#626260" size={rem(14)} weight={700}>
          {t("price")}
        </Text>
        <RangeSlider
          onChangeEnd={(e) => setFilter((f: any) => ({ ...f, price: e }))}
          onChange={(e) => setPrice(e)}
          thumbSize={24}
          max={10000}
          mt={rem(16)}
          defaultValue={filter.price}
          value={price}
          color="orange.6"
          styles={(theme) => ({
            thumb: {
              borderWidth: rem(4),
              background: theme.colors.orange[6],
              borderColor: "white",
              transition: "outline 0.2s linear",
              [":hover"]: {
                outline: `4px solid ${theme.colors.orange[3]}`,
              },
            },
            label: {
              background: theme.colors.orange[6],
              top: "-2.4rem",
            },
          })}
        />
        <Group spacing={rem("8px")} mt={rem("16px")} grow>
          <Flex bg={"#F6F4F1"} p={rem("8px")} direction={"column"}>
            <Text size={rem("14px")} weight={700} color="#706C6A">
              {t("from")}
            </Text>
            <Text size={rem("14px")} weight={700} mt={rem(4)} color="#2B2A29">
              {t("AED")} {filter.price[0]}
            </Text>
          </Flex>
          <Flex bg={"#F6F4F1"} p={rem("8px")} direction={"column"}>
            <Text size={rem("14px")} weight={700} color="#706C6A">
              {t("to")}
            </Text>
            <Text size={rem("14px")} weight={700} mt={rem(4)} color="#2B2A29">
              {t("AED")} {filter.price[1]}
            </Text>
          </Flex>
        </Group>
      </Container>
      <Divider color="#E5E5E5" my={rem("24px")} />
      <Accordion
        styles={(theme) => ({
          item: {
            border: "none",
          },
          chevron: {
            color: theme.colors.orange[6],
          },
          control: {
            paddingBottom: "24px",
            [":hover"]: {
              backgroundColor: "transparent",
            },
          },
          label: {
            fontSize: "14px",
            fontWeight: 700,
            color: "#626260",
          },
        })}
      >
        <Accordion.Item value="Car-brand">
          <Accordion.Control pt={0}>{t("brand_title")}</Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carBrands.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.name}
                  value={value.id}
                  checked={filter.brand.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      brand: e.target.checked
                        ? f.brand.concat(e.target.value)
                        : f.brand.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Car-model">
          <Accordion.Control pt={rem("24px")}>
            {t("year_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carYear.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.year}
                  value={value.id}
                  checked={filter.year.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      year: e.target.checked
                        ? f.year.concat(e.target.value)
                        : f.year.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Body-style">
          <Accordion.Control pt={rem("24px")}>
            {t("body_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carCategory.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.name}
                  value={value.id}
                  checked={filter.category.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      category: e.target.checked
                        ? f.category.concat(e.target.value)
                        : f.category.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Color">
          <Accordion.Control pt={rem("24px")}>
            {t("color_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carColors.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.name}
                  value={value.id}
                  checked={filter.color.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      color: e.target.checked
                        ? f.color.concat(e.target.value)
                        : f.color.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Fuel-type">
          <Accordion.Control pt={rem("24px")}>
            {t("fuel_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carFuels.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.name}
                  value={value.id}
                  checked={filter.fuel_type.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      fuel_type: e.target.checked
                        ? f.fuel_type.concat(e.target.value)
                        : f.fuel_type.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Features-included">
          <Accordion.Control pt={rem("24px")}>
            {t("feature_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              {carFeatures.map((value: any, i: any) => (
                <Checkbox
                  key={i}
                  color="orange.6"
                  label={value.name}
                  value={value.id}
                  checked={filter.features.includes(value.id)}
                  onChange={(e) =>
                    setFilter((f: any) => ({
                      ...f,
                      features: e.target.checked
                        ? f.features.concat(e.target.value)
                        : f.features.filter((c: any) => c != e.target.value),
                    }))
                  }
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Capacity">
          <Accordion.Control pt={rem("24px")}>
            {t("capacity_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              <Checkbox
                color="orange.6"
                label={"2-5 passengers"}
                checked={filter.passengers.includes(2)}
                onChange={(e) =>
                  setFilter((f: any) => ({
                    ...f,
                    passengers: e.target.checked ? [2, 5] : [],
                  }))
                }
                value={2}
              />
              <Checkbox
                color="orange.6"
                label={"6, or more passengers"}
                checked={filter.passengers.includes(6)}
                onChange={(e) =>
                  setFilter((f: any) => ({
                    ...f,
                    passengers: e.target.checked ? [6, 10000] : [],
                  }))
                }
                value={6}
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Divider color="#E5E5E5" />

        <Accordion.Item value="Luggage">
          <Accordion.Control pt={rem("24px")}>
            {t("luggage_title")}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={1} spacing={"16px"} verticalSpacing={"16px"}>
              <Checkbox
                color="orange.6"
                label={"1-2 luggage"}
                value={1}
                checked={filter.luggae.includes(1)}
                onChange={(e) =>
                  setFilter((f: any) => ({
                    ...f,
                    luggae: e.target.checked ? [1, 2] : [],
                  }))
                }
              />
              <Checkbox
                color="orange.6"
                label={"3, or more luggage"}
                value={3}
                checked={filter.luggae.includes(3)}
                onChange={(e) =>
                  setFilter((f: any) => ({
                    ...f,
                    luggae: e.target.checked ? [3, 200000] : [],
                  }))
                }
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Filter;
