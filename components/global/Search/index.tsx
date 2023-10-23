import { Button, Divider, Group, rem } from "@mantine/core";
import React, { useState } from "react";
import BookingMode from "../../dropdowns/bookingmode";
import DateSelector from "../../dropdowns/dateselector";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

type Props = {};

const Search = ({ t }: any) => {
  const router = useRouter();
  const [pickDate, setPickDate]: any = useState({ date: "", time: "" });
  const [returnDate, setReturnDate]: any = useState({ date: "", time: "" });
  const matches = useMediaQuery("(max-width: 600px)");
  return (
    <Group
      noWrap={matches ? false : true}
      mt={50}
      position="center"
      bg={"#F6F5F5"}
      p={24}
      style={{ borderRadius: "8px" }}
    >
      <DateSelector
        color="#F3F0EE"
        data={pickDate}
        setData={setPickDate}
        title={t("pick_title")}
      />
      {!matches && <Divider orientation="vertical" color="#B2AFAE" />}
      <DateSelector
        color="#F3F0EE"
        data={returnDate}
        setData={setReturnDate}
        title={t("return_title")}
      />
      <Button
        style={{ width: matches ? "100%" : "121px", height: "48px" }}
        color="orange.6"
        fz={rem(18)}
        fw={700}
        disabled={
          pickDate.date && pickDate.time && returnDate.date && returnDate.time
            ? false
            : true
        }
        onClick={() =>
          router.push(
            `/fleet?pick=${pickDate.date} ${pickDate.time}&return=${returnDate.date} ${returnDate.time}`
          )
        }
      >
        {t("search")}
      </Button>
    </Group>
  );
};

export default Search;
