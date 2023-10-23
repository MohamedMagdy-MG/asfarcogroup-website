import React from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Text, TextInput, rem } from "@mantine/core";
import globalClasses from "../styles.module.scss";
import { notifications } from "@mantine/notifications";
import { ForgetPasswordApi } from "../../../Services";
import { useRouter } from "next/router";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";

type Props = { t: any };

const ForgetPasswordForm = ({ t, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  const router = useRouter();
  const [email, setEmail] = useLocalStorage({
    key: "user-email",
  });
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {},
  });

  const Submit = (values: any) => {
    notifications.show({
      id: "reg-v",
      loading: true,
      title: "Forget Password",
      message: "in  process...",
      autoClose: false,
      withCloseButton: false,
    });
    ForgetPasswordApi(values, lang)
      .then((res) => {
        setEmail(values.email);
        notifications.update({
          id: "reg-v",
          title: "Forget Password Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        router.push("/auth/verificationpassword");
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "reg-v",
          title: "Forget Password Failed",
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
      <TextInput
        label={t("email_title")}
        placeholder="your@email.com"
        className={globalClasses.inputStyle}
        {...form.getInputProps("email")}
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
          disabled={!form.isDirty()}
        >
          {t("continue_btn")}
        </Button>
      </Group>
    </form>
  );
};

export default ForgetPasswordForm;
