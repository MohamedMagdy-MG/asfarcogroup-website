import React from "react";
import { Popover, Text, Group } from "@mantine/core";
import { IconCalendarPin, IconChevronRight } from "@tabler/icons-react";
type Props = { color: string };
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  DateCalendar,
  DateTimePicker,
  MultiSectionDigitalClock,
  StaticDateTimePicker,
  StaticTimePicker,
  TimeClock,
} from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useMediaQuery } from "@mantine/hooks";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem",
      width: "100%",
    },
  },
});
const DateSelector = ({ data, setData, title }: any) => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Popover position="bottom" shadow="md">
      <Popover.Target>
        <Group
          position="apart"
          spacing={"xl"}
          style={{
            cursor: "pointer",
            width: matches ? "100%" : "280px",
            height: matches ? "45px" : "auto",
          }}
          noWrap
        >
          <Group noWrap position="left" mr={30} spacing={"xs"}>
            <IconCalendarPin color="#706C6A" size={20} />
            <Text
              style={{ whiteSpace: "nowrap" }}
              color={data?.date && data.time ? "orange.6" : "#706C6A"}
              fs={"18px"}
              weight={700}
            >
              {data?.date && data.time ? `${data.date} - ${data.time}` : title}
            </Text>
          </Group>
          <IconChevronRight color="#706C6A" />
        </Group>
      </Popover.Target>
      <Popover.Dropdown
        h={matches ? "auto" : "325px"}
        mt={"25px"}
        style={{ overflow: "hidden" }}
        bg="#F6F5F5"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <Group noWrap>
              {matches && (
                <StaticDateTimePicker
                  defaultValue={dayjs("2022-04-17T15:30")}
                  onChange={(e: any) =>
                    setData((d: any) => ({
                      time: dayjs(e.$d.getTime()).format("HH:mm:ss"),
                      date: dayjs(e.$d.getTime()).format("YYYY-MM-DD"),
                    }))
                  }
                />
              )}
              {!matches && (
                <DateCalendar
                  onChange={(e: any) =>
                    setData((d: any) => ({
                      ...d,
                      date: dayjs(e.$d.getTime()).format("YYYY-MM-DD"),
                    }))
                  }
                />
              )}
              {!matches && (
                <div>
                  <MultiSectionDigitalClock
                    onChange={(e: any) =>
                      setData((d: any) => ({
                        ...d,
                        time: dayjs(e.$d.getTime()).format("HH:mm:ss"),
                      }))
                    }
                  />
                </div>
              )}
            </Group>
          </ThemeProvider>
        </LocalizationProvider>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DateSelector;
