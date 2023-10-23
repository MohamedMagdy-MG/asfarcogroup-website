import {
  Avatar,
  Button,
  Center,
  Container,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  NumberInput,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { PaymentApi, PaymentDeleteApi } from "../../../Services";
import classes from "./style.module.css";
import { IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const Payment = ({ user, payments, t, lang }: any) => {
  const [paymentsData, setPaymentsData] = useState(payments || []);
  const [addMode, setAddMode] = useState(false);
  const matches = useMediaQuery("(max-width: 600px)");

  const form = useForm({
    initialValues: {
      number: "",
      name: "",
      month: "",
      date: "",
      cvv: "",
    },
    validate: {},
  });
  let date = new Date();

  function generateYearsBetween(startYear: any, endYear: any) {
    const endDate = endYear || new Date().getFullYear();
    let years = [];

    for (var i = startYear; i <= endDate; i++) {
      years.push(startYear);
      startYear++;
    }
    return years.map((str) => str.toString());
  }

  const Submit = (values: any) => {
    notifications.show({
      id: "add-p",
      loading: true,
      title: "Payments",
      message: "Payments in Proccess",
      autoClose: true,
      withCloseButton: true,
    });
    PaymentApi(values, user?.token, lang)
      .then((res) => {
        notifications.update({
          id: "add-p",
          title: "Payments Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        setPaymentsData(res);
        form.reset();
        setAddMode(false);
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "add-p",
          title: "Payments Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  const deleteAddress = (id: any) => {
    notifications.show({
      id: "add-p",
      loading: true,
      title: "Address",
      message: "Address in Proccess",
      autoClose: false,
      withCloseButton: true,
    });
    PaymentDeleteApi({ id }, user?.token, lang)
      .then((res) => {
        notifications.update({
          id: "add-p",
          title: "Address Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        setPaymentsData(res);
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "add-p",
          title: "Address Failed",
          message: "Address Deleted Successfuly",
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  return (
    <Container fluid bg={"#F3F0EE"} py={32}>
      {paymentsData?.map((item: any, i: any) => (
        <div className={classes.addressCard} key={i}>
          <Group position="apart">
            <Text size={"18px"} weight={400} lh={"24px"} color="#2B2A29">
              **** **** **** {item?.number.substr(item?.number.length - 4)}
            </Text>
            <Flex gap={16} align={"center"} justify={"center"}>
              {item?.type === "visa" ? (
                <Image src={"/assets/images/visa.svg"} height={12} width={39} />
              ) : (
                <Image
                  src={"/assets/images/mastercard.svg"}
                  height={24}
                  width={36}
                  fit="contain"
                />
              )}
              <IconTrash
                style={{ cursor: "pointer" }}
                color="#39393C"
                stroke={1}
                onClick={() => deleteAddress(item?.id)}
              />
            </Flex>
          </Group>
        </div>
      ))}

      {!addMode && (
        <div style={{width: matches ? "100%" : "50%", margin: "0 auto" }}>
          <Button
            radius="sm"
            color="orange.6"
            px={16}
            py={12}
            p={0}
            size="lg"
            type="button"
            w={"100%"}
            mt={40}
            onClick={() => setAddMode(true)}
          >
            {t("new_card")}
          </Button>
        </div>
      )}

      {addMode && (
        <form
          style={{ width: matches ? "100%" : "50%", margin: "0 auto" }}
          onSubmit={form.onSubmit((values) => Submit(values))}
        >
          <Flex justify={"end"} align={"center"} gap={8} mt={40}>
            <Image src={"/assets/images/visa.svg"} height={12} width={39} />
            <Image
              src={"/assets/images/mastercard.svg"}
              height={24}
              width={36}
              fit="contain"
            />
          </Flex>
          <Grid gutter={16}>
            <Grid.Col span={12}>
              <TextInput
                label={t("cc_title")}
                placeholder=""
                {...form.getInputProps("number")}
                withAsterisk
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
                maxLength={16}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label={t("cc_holder")}
                placeholder=""
                {...form.getInputProps("name")}
                withAsterisk
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
              />
            </Grid.Col>
            <Grid.Col span={matches?12:6}>
              <Flex gap={8} justify={"center"} align={"center"}>
                <Select
                  placeholder="Pick one"
                  label={t("cc_exp")}
                  {...form.getInputProps("month")}
                  data={[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ]}
                  styles={() => ({
                    input: {
                      background: "transparent",
                    },
                  })}
                  searchable
                  withAsterisk
                />
                <Text mt={24} size={20}>
                  /
                </Text>
                <Select
                  placeholder="Pick one"
                  label={" "}
                  {...form.getInputProps("date")}
                  data={generateYearsBetween(
                    date.getFullYear(),
                    date.getFullYear() + 10
                  )}
                  styles={() => ({
                    input: {
                      background: "transparent",
                    },
                  })}
                  searchable
                />
              </Flex>
            </Grid.Col>
            <Grid.Col span={matches?12:6}>
              <TextInput
                label={t("cvv")}
                placeholder=""
                {...form.getInputProps("cvv")}
                withAsterisk
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
                maxLength={3}
              />
            </Grid.Col>
          </Grid>
          <SimpleGrid mt={40} spacing={24} cols={2}>
            <Button
              radius="sm"
              color="orange.6"
              px={16}
              py={12}
              p={0}
              size="lg"
              type="submit"
            >
              {t("save")}
            </Button>
            <Button
              radius="sm"
              color="dark.6"
              px={16}
              py={12}
              p={0}
              size="lg"
              variant="outline"
              role="button"
              type="button"
              onClick={() => (setAddMode(false), form.reset())}
            >
              {t("cancel")}
            </Button>
          </SimpleGrid>
        </form>
      )}
    </Container>
  );
};

export default Payment;
