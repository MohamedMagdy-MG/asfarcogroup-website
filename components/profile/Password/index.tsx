import {
  Avatar,
  Button,
  Center,
  Container,
  FileButton,
  Flex,
  Grid,
  NumberInput,
  PasswordInput,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import React, { useState } from "react";
import { PasswordApi } from "../../../Services";
import { useMediaQuery } from "@mantine/hooks";
type Props = { user: any };

const Password = ({ user, t, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  const form = useForm({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validate: {},
  });

  const Submit = (values: any) => {
    notifications.show({
      id: "pass-p",
      loading: true,
      title: "Password",
      message: "Password in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    PasswordApi(values, user?.token, lang)
      .then((res) => {
        form.reset();
        notifications.update({
          id: "pass-p",
          title: "Password Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "pass-p",
          title: "Password Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  return (
    <Container fluid bg={"#F3F0EE"} py={32}>
      <form
        style={{ width:matches ? "100%" : "50%", margin: "0 auto" }}
        onSubmit={form.onSubmit((values) => Submit(values))}
      >
        <PasswordInput
          label={t("current_pass")}
          mt={rem(16)}
          dir="ltr"
          {...form.getInputProps("current_password")}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
          }
          styles={() => ({
            input: {
              background: "transparent",
              direction: "ltr",
            },
          })}
        />
        <PasswordInput
          label={t("new_pass")}
          mt={rem(16)}
          dir="ltr"
          {...form.getInputProps("new_password")}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
          }
          styles={() => ({
            input: {
              background: "transparent",
              direction: "ltr",
            },
          })}
        />
        <PasswordInput
          label={t("condirm_new_pass")}
          mt={rem(16)}
          dir="ltr"
          {...form.getInputProps("new_password_confirmation")}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
          }
          styles={() => ({
            input: {
              background: "transparent",
              direction: "ltr",
            },
          })}
        />

        <SimpleGrid mt={40} spacing={24} cols={2}>
          <Button
            radius="sm"
            color="orange.6"
            px={16}
            py={12}
            p={0}
            size="lg"
            disabled={!form.isDirty()}
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
            disabled={!form.isDirty()}
            role="button"
            type="button"
            onClick={() => form.reset()}
          >
            {t("cancel")}
          </Button>
        </SimpleGrid>
      </form>
    </Container>
  );
};

export default Password;
