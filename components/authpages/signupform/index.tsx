import React, { useRef } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Select,
  Text,
  TextInput,
  ThemeIcon,
  rem,
} from "@mantine/core";
import globalClasses from "../styles.module.scss";
import classes from "./style.module.scss";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconCirclePlus,
  IconDatabase,
  IconExclamationMark,
  IconEyeOff,
  IconPlus,
} from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { Dropzone } from "@mantine/dropzone";
import { useRouter } from "next/router";
import { SignUpApi, UploudImages } from "../../../Services";
type Props = { t: any; nationalityData: any };
import { notifications } from "@mantine/notifications";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";

const SignupForm = ({ t, nationalityData, lang }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");
  const [email, setEmail] = useLocalStorage({
    key: "user-email",
    defaultValue: null,
  });
  const openRef = useRef<() => void>(null);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      gender: "",
      nationality: "",
      register_type: "Email",
      Documents: [],
    },
    validate: {},
  });

  const UploadFiles = (files: any) => {
    notifications.show({
      id: "img-up",
      loading: true,
      title: "Document",
      message: "Your Document Uploads now",
      autoClose: false,
      withCloseButton: false,
    });
    UploudImages(files).then((res) => {
      form.setValues((v) => ({ ...v, Documents: res }));
      notifications.update({
        id: "img-up",
        title: "Document",
        message: "Your Documents Uploaded Successfully",
        autoClose: true,
        withCloseButton: true,
        color: "green.6",
      });
    });
  };

  const Submit = (values: any) => {
    notifications.show({
      id: "reg-p",
      loading: true,
      title: "Document",
      message: "Your Document Uploads now",
      autoClose: false,
      withCloseButton: false,
    });
    SignUpApi(values, lang)
      .then((res) => {
        setEmail(res.data.email);
        notifications.update({
          id: "reg-p",
          title: "Register Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
        router.push("/auth/verification");
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "reg-p",
          title: "Register Failed",
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
        label={t("name_title")}
        placeholder="e.g Jone"
        className={globalClasses.inputStyle}
        {...form.getInputProps("name")}
        withAsterisk
      />

      <TextInput
        label={t("email_title")}
        placeholder="your@email.com"
        className={globalClasses.inputStyle}
        {...form.getInputProps("email")}
        mt={rem(16)}
        withAsterisk
      />
      <TextInput
        label={t("phone_title")}
        placeholder=""
        className={globalClasses.inputStyle}
        mt={rem(16)}
        {...form.getInputProps("mobile")}
        withAsterisk
      />
      <Select
        data={["Male", "Female", "Other"]}
        placeholder="Pick Gender"
        label={t("gender")}
        mt={rem(16)}
        {...form.getInputProps("gender")}
        withAsterisk
      />

      <Select
        data={nationalityData}
        placeholder="Pick one"
        label={t("nationality_title")}
        mt={rem(16)}
        {...form.getInputProps("nationality")}
        withAsterisk
        searchable
      />

      <PasswordInput
        label={t("pass_title")}
        mt={rem(16)}
        dir="ltr"
        {...form.getInputProps("password")}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEyeOff size={25} /> : <IconEye size={25} />
        }
        withAsterisk
      />

      <Dropzone
        openRef={openRef}
        onDrop={(e) => UploadFiles(e)}
        activateOnClick={false}
        styles={{
          inner: { pointerEvents: "all", borderColor: "#E1561B" },
          root: {
            background: "#FDEDE6",
            borderColor: "#E1561B",
            padding: "24px",
            [":hover"]: { background: "#FDEDE6" },
          },
        }}
        mt={rem(16)}
      >
        <Center>
          <IconCirclePlus size={24} color="#E1561B" />
        </Center>
        <Center>
          <Text mt={rem(16)} size={rem(16)} fw={700}>
            {t("drop_description")}
          </Text>
        </Center>
        <Center>
          <Text mt={rem(8)} size={rem(12)} fw={400}>
            <span
              style={{ color: "#1681EC" }}
              onClick={() => openRef.current?.()}
            >
              {t("drop_link")}
            </span>{" "}
            {t("drop_link_desc")}
          </Text>
        </Center>
      </Dropzone>
      <Group spacing={15} mt={"md"} noWrap style={{ alignItems: "start" }}>
        <ThemeIcon radius="xl" size="sm" color={"#13CE66"}>
          <IconExclamationMark
            stroke={4}
            style={{ width: "70%", height: "70%" }}
          />
        </ThemeIcon>
        <Text fs={rem(14)} fw={400} color="#706C6A" sx={{ lineHeight: 1 }}>
          {t("license_description")}{" "}
          <span style={{ color: "#1681EC", cursor: "pointer" }}>
            {t("click_link")}
          </span>
        </Text>
      </Group>
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
          {t("signup_btn")}
        </Button>
      </Group>
      <Text mt={rem(24)} align="center" color="#706C6A">
        <Text className={classes.forget}>
          {t("account")} <Link href={"login"}>{t("login")}</Link>
        </Text>
      </Text>
      <Divider my={rem(24)} label="Or" labelPosition="center" />
      <Group position="center">
        <Button
          fullWidth
          h={rem(48)}
          type="button"
          size={rem(16)}
          fw={700}
          variant="outline"
          color="dark.6"
          role="button"
          onClick={() => router.push("/")}
        >
          {t("gest_btn")}
        </Button>
      </Group>
    </form>
  );
};

export default SignupForm;
