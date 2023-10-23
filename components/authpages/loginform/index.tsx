import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import globalClasses from "../styles.module.scss";
import classes from "./style.module.scss";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconDatabase,
  IconEyeOff,
} from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { LoginApi } from "../../../Services";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useMediaQuery } from "@mantine/hooks";

type Props = { t: any };

const LoginForm = ({ t, lang }: any) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {},
  });
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 600px)");

  const Submit = (values: any) => {
    notifications.show({
      id: "log-p",
      loading: true,
      title: "Login",
      message: "Login in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    LoginApi({ ...values, login_type: "Email" }, lang)
      .then((res) => {
        notifications.update({
          id: "log-p",
          title: "Login Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        signIn("credentials", {
          ...res.data,
          ...res.data.PersonalInformation,
          redirect: null,
        });
        router.push("/");
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "log-p",
          title: "Login Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit((values) => Submit(values))}>
      <Text
        size={matches ? rem(32) : rem(40)}
        mb={matches ? rem(32) : rem(56)}
        fw={700}
        color={"#2B2A29"}
      >
        {t("title")}
      </Text>
      <TextInput
        label={t("email_title")}
        placeholder="your@email.com"
        className={globalClasses.inputStyle}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("pass_title")}
        mt={rem(16)}
        dir="ltr"
        {...form.getInputProps("password")}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
        }
      />

      <Text mt={rem(16)} align="right" color="#706C6A">
        <Link className={classes.forget} href={"forgetpassword"}>
          {t("forget")}
        </Link>
      </Text>

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
          {t("login_btn")}
        </Button>
      </Group>
      <Text mt={rem(24)} align="center" color="#706C6A">
        <Text className={classes.forget}>
          {t("account")} <Link href={"signup"}>{t("sign_up")}</Link>
        </Text>
      </Text>
      <Divider my={rem(24)} label="Or" labelPosition="center" />
      <Group position="center">
        <Button
          fullWidth
          h={rem(48)}
          type="submit"
          size={rem(16)}
          fw={700}
          color="dark.7"
          leftIcon={<IconBrandApple fill="#ffffff" />}
        >
          {t("apple_btn")}
        </Button>
      </Group>
      <Group position="center">
        <Button
          fullWidth
          h={rem(48)}
          type="button"
          role="button"
          size={rem(16)}
          fw={700}
          color="white"
          mt={rem(16)}
          leftIcon={<IconBrandGoogle stroke={3} />}
          onClick={() => signIn("google")}
        >
          {t("google_btn")}
        </Button>
      </Group>
    </form>
  );
};

export default LoginForm;
