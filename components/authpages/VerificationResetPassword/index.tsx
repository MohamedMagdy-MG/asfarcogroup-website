import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, PinInput, Text, TextInput, rem } from "@mantine/core";
import globalClasses from "../styles.module.scss";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import {
  ActiveAccount,
  ActivePasswordAccount,
  ForgetPasswordApi,
  SendActiviationCode,
} from "../../../Services";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

type Props = { t: any };

const VerificationResetPassword = ({ t, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  const [email, setEmail] = useLocalStorage({
    key: "user-email",
  });
  const [time, setTime] = useState("0:00");
  const router = useRouter();
  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => (value.length === 6 ? null : "Invalid pen"),
    },
  });

  var timeoutHandle;

  const countdown = useCallback((minutes: any, seconds: any) => {
    function tick() {
      setTime(
        minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds)
      );
      seconds--;
      if (seconds >= 0) {
        timeoutHandle = setTimeout(tick, 1000);
      } else {
        if (minutes >= 1) {
          setTimeout(function () {
            countdown(minutes - 1, 59);
          }, 1000);
        }
      }
    }
    tick();
  }, []);

  const Submit = (values: any) => {
    notifications.show({
      id: "reg-v",
      loading: true,
      title: "Verifications",
      message: "Your Verifications Uploads now",
      autoClose: false,
      withCloseButton: false,
    });
    ActivePasswordAccount(email, values.otp, lang)
      .then((res) => {
        setEmail(res.data.email);
        notifications.update({
          id: "reg-v",
          title: "Active Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        signIn("credentials", {
          ...res.data,
          ...res.data.PersonalInformation,
          redirect: null,
        }).then(() => {
          router.push("/auth/resetpassword");
        });
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "reg-v",
          title: "Active Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  const Resend = () => {
    ForgetPasswordApi({ email }, lang)
      .then((res) => {
        countdown(2, 0);
        notifications.show({
          title: "OTP Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
      })
      .catch((err) => {
        notifications.show({
          title: "OTP Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  useEffect(() => {
    countdown(2, 0);
  }, []);

  return (
    <form onSubmit={form.onSubmit((values) => Submit(values))}>
      <Text size={matches ? rem(32) : rem(40)} fw={700} color={"#2B2A29"}>
        {t("title")}
      </Text>
      <Text
        size={matches ? rem(14) : rem(16)}
        mb={rem(0)}
        fw={400}
        color={"#626260"}
      >
        {t("description")}
      </Text>
      <Text
        size={matches ? rem(14) : rem(16)}
        mb={matches ? rem(32) : rem(56)}
        fw={400}
        color={"#2B2A29"}
      >
        {email}
      </Text>
      <Group position="center">
        <PinInput length={6} size="xl" {...form.getInputProps("otp")} />
      </Group>

      <Group position="center">
        <Button
          disabled={form.values.otp?.length !== 6}
          fullWidth
          h={rem(48)}
          type="submit"
          size={rem(18)}
          fw={700}
          color="orange.6"
          mt={rem(24)}
        >
          {t("verify_btn")}
        </Button>
      </Group>
      <Group position="apart" mt={24}>
        <Text>Time Remaining: {time}</Text>
        <Text
          underline
          color={time == "0:00" ? "orange.6" : "gray.4"}
          onClick={() => Resend()}
        >
          Resed OTP
        </Text>
      </Group>
    </form>
  );
};

export default VerificationResetPassword;
