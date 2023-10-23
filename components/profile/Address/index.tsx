import {
  Avatar,
  Button,
  Center,
  Container,
  FileButton,
  Flex,
  Grid,
  Group,
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
import { AddressApi, AddressDeleteApi } from "../../../Services";
import classes from "./style.module.css";
import { IconTrash } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

type Props = { user: any; citiesData: any; address: any };

const Address = ({ user, citiesData, address, t, lang }: any) => {
  const [addresses, setAddresses] = useState(address || []);
  const [addMode, setAddMode] = useState(false);
  const matches = useMediaQuery("(max-width: 600px)");

  const form = useForm({
    initialValues: {
      address: "",
      label: "",
      city: "",
    },
    validate: {},
  });

  const Submit = (values: any) => {
    notifications.show({
      id: "add-p",
      loading: true,
      title: "Address",
      message: "Address in Proccess",
      autoClose: false,
      withCloseButton: true,
    });
    AddressApi(values, user?.token, lang)
      .then((res) => {
        notifications.update({
          id: "add-p",
          title: "Address Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        setAddresses(res);
        form.reset();
        setAddMode(false);
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "add-p",
          title: "Address Failed",
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
    AddressDeleteApi({ id }, user?.token, lang)
      .then((res) => {
        notifications.update({
          id: "add-p",
          title: "Address Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        setAddresses(res);
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
      {addresses?.map((item: any, i: any) => (
        <div className={classes.addressCard} key={i}>
          <Group position="apart" mb={12}>
            <Text size={"20px"} weight={700} lh={"24px"} color="#2B2A29">
              {item?.label}
            </Text>
            <Text onClick={() => deleteAddress(item?.id)}>
              <IconTrash
                style={{ cursor: "pointer" }}
                color="#39393C"
                stroke={1}
              />
            </Text>
          </Group>
          <Text size={"20px"} weight={400} lh={"28px"} color="#626260" mb={8}>
            {item?.address}
          </Text>
          <Text size={"16px"} weight={700} lh={"28px"} color="#2B2A29">
            {item?.CityName}
          </Text>
        </div>
      ))}

      {!addMode && (
        <div style={{ width: matches ? "100%" : "50%", margin: "0 auto" }}>
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
            {t("add_address")}
          </Button>
        </div>
      )}

      {addMode && (
        <form
          style={{ width: matches ? "100%" :  "50%", margin: "0 auto" }}
          onSubmit={form.onSubmit((values) => Submit(values))}
        >
          <Grid gutter={16} mt={40}>
            <Grid.Col span={12}>
              <TextInput
                label={t("label_title")}
                placeholder=""
                {...form.getInputProps("label")}
                withAsterisk
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label={t("address")}
                placeholder=""
                {...form.getInputProps("address")}
                withAsterisk
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              {" "}
              <Select
                placeholder="Pick one"
                label={t("city")}
                {...form.getInputProps("city")}
                data={citiesData}
                styles={() => ({
                  input: {
                    background: "transparent",
                  },
                })}
                searchable
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

export default Address;
