import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { ResetPasswordApi } from "../../../Services";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";

type Props = { t: any };

const ResetPasswordForm = ({ t, lang }: any) => {
  const { data } = useSession();
  const matches = useMediaQuery("(max-width: 600px)");
  let user: any = data?.user;
  const form = useForm({
    initialValues: {
      new_password: "",
      new_password_confirmation: "",
    },
    validate: {
      new_password_confirmation: (value, values) =>
        value !== values.new_password ? "Passwords did not match" : null,
    },
  });
  const router = useRouter();

  const Submit = (values: any) => {
    notifications.show({
      id: "rpass-p",
      loading: true,
      title: "Password",
      message: "Password in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    ResetPasswordApi(values, user?.token, lang)
      .then((res) => {
        form.reset();
        notifications.update({
          id: "rpass-p",
          title: "Password Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        router.push("/");
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "rpass-p",
          title: "Password Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit((values) => Submit(values))}>
      <Text size={matches ? rem(32) : rem(40)} fw={700} color={"#2B2A29"}>
        {t("title")}
      </Text>
      <Text
        size={matches ? rem(14) : rem(16)}
        mb={matches ? rem(32) : rem(56)}
        fw={400}
        color={"#626260"}
      >
        {t("description")}
      </Text>

      <PasswordInput
        label={t("pass_title")}
        mt={rem(16)}
        dir="ltr"
        {...form.getInputProps("new_password")}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
        }
      />
      <PasswordInput
        label={t("confirm_title")}
        mt={rem(16)}
        dir="ltr"
        {...form.getInputProps("new_password_confirmation")}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
        }
      />

      <Group position="center">
        <Button
          fullWidth
          h={rem(48)}
          type="submit"
          size={rem(18)}
          fw={700}
          color="orange.6"
          mt={rem(24)}
        >
          {t("reset_btn")}
        </Button>
      </Group>
    </form>
  );
};

export default ResetPasswordForm;
