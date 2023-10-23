import {
  Avatar,
  Button,
  Center,
  Container,
  FileButton,
  Flex,
  Grid,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { ProfileUpdateApi, ProfileUpdateImageApi } from "../../../Services";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mantine/hooks";
type Props = { user: any; nationalityData: any; profile: any };

const PersonalInformation = ({ user, nationalityData, profile, t, lang }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const { data: session, status, update } = useSession();
  const matches = useMediaQuery("(max-width: 600px)");

  const form = useForm({
    initialValues: {
      name: profile?.name || "",
      mobile: profile?.mobile || "",
      gender: profile?.gender || "",
      image: profile?.image || "",
      Nationality: profile?.Nationality,
      Documents: profile?.Documents || [],
    },
    validate: {},
  });

  const Submit = (values: any) => {
    let data: any = {};

    for (let key in values) {
      if (form.isDirty(key)) {
        data[key] = values[key];
      }
    }

    notifications.show({
      id: "Profile-p",
      loading: true,
      title: "Profile",
      message: "Profile in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    ProfileUpdateApi(data, user?.token, lang)
      .then((res) => {
        update({ name: res.data.PersonalInformation.name });
        form.setInitialValues({
          ...res.data.PersonalInformation,
          nationality_id: res.data.PersonalInformation.NationalityID,
        });
        data = {};
        notifications.update({
          id: "Profile-p",
          title: "Profile Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "Profile-p",
          title: "Profile Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  const ImageUpdate = (file: any) => {
    notifications.show({
      id: "Profile-p",
      loading: true,
      title: "Profile",
      message: "Profile in Proccess",
      autoClose: false,
      withCloseButton: false,
    });
    ProfileUpdateImageApi(file, user?.token, lang)
      .then((res) => {
        update({ image: res.data.PersonalInformation.image });
        form.setInitialValues({
          ...res.data.PersonalInformation,
          nationality_id: res.data.PersonalInformation.NationalityID,
        });

        notifications.update({
          id: "Profile-p",
          title: "Profile Success",
          message: res.message,
          autoClose: true,
          withCloseButton: true,
          color: "green.6",
        });
      })
      .catch((err) => {
        form.setErrors(err.response.data.errors);
        notifications.update({
          id: "Profile-p",
          title: "Profile Failed",
          message: err.response.data.message,
          autoClose: true,
          withCloseButton: true,
          color: "red.6",
        });
      });
  };

  return (
    <Container fluid bg={"#F3F0EE"} py={32}>
      <Flex align={"center"} direction={"column"}>
        <Avatar
          src={session?.user?.image}
          size={150}
          alt="it's me"
          styles={{
            image: {
              border: "5px solid #D2D0CF",
              borderRadius: "50%",
              objectPosition: "center",
            },
          }}
        />
        <Text color="#2B2A29" size={24} weight={700} mt={24}>
          {session?.user?.name}
        </Text>
        <FileButton onChange={ImageUpdate} accept="image/png,image/jpeg">
          {(props) => (
            <Button
              radius="sm"
              color="orange.6"
              mt={24}
              px={16}
              py={12}
              p={0}
              size="md"
              {...props}
            >
              {t("upload")}
            </Button>
          )}
        </FileButton>
      </Flex>
      <form
        style={{
          width: matches ? "100%" : "50%",
          margin: "0 auto",
          marginTop: "32px",
        }}
        onSubmit={form.onSubmit((values) => Submit(values))}
      >
        <TextInput
          label={t("name_title")}
          placeholder="e.g Jone"
          {...form.getInputProps("name")}
          styles={() => ({
            input: {
              background: "transparent",
            },
          })}
        />

        <TextInput
          label={t("mobile_title")}
          placeholder=""
          mt={rem(16)}
          {...form.getInputProps("mobile")}
          styles={() => ({
            input: {
              background: "transparent",
            },
          })}
        />

        <Select
          data={[t("male"), t("female"), t("other")]}
          placeholder="Pick Gender"
          label={t("gender")}
          mt={rem(16)}
          {...form.getInputProps("gender")}
          styles={() => ({
            input: {
              background: "transparent",
            },
          })}
        />

        <Select
          data={nationalityData}
          placeholder="Pick one"
          label={t("nationality_title")}
          mt={rem(16)}
          {...form.getInputProps("Nationality")}
          styles={() => ({
            input: {
              background: "transparent",
            },
          })}
          searchable
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

export default PersonalInformation;
