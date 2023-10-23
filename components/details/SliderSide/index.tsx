import React, { useCallback, useEffect, useRef, useState } from "react";
import { Carousel, Embla } from "@mantine/carousel";
import { Flex, Group, Image, Text } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./style.module.css";
const SliderSide = ({ data }: any) => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [current, setCurrent] = useState<any | null>(0);
  const matches = useMediaQuery("(max-width: 600px)");

    const handleScroll = useCallback(() => {
      if (!embla) return;
      setCurrent(embla.selectedScrollSnap());
    }, [embla]);

    useEffect(() => {
      if (embla) {
        embla.on("scroll", handleScroll);
      }
    }, [embla, handleScroll]);

  const slides = data.Images.map((url: any) => (
    <Carousel.Slide key={url}>
      <Image
        src={url}
        height={matches ? "250px" : "350px"}
        mx={"auto"}
        fit="cover"
        alt=""
      />
    </Carousel.Slide>
  ));

  return (
    <div>
      <Carousel
        align={"center"}
        loop
        dragFree
        controlsOffset="xl"
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={(theme) => ({
          // control: {
          //   background: "transparent",
          //   color: "#B2AFAE",
          //   border: "2px solid #B2AFAE",
          //   fontSize: "30px",
          // },
        })}
      >
        {slides}
      </Carousel>
      <div className={classes.imagesScroll}>
        {data.Images.map((url: any, i: any) => (
          <Image
            key={i}
            radius={4}
            src={url}
            height={56}
            width={56}
            opacity={current == i ? 1 : 0.5}
            fit="cover"
            onClick={() => embla?.scrollTo(i)}
            style={{ cursor: "pointer" }}
            alt=""
          />
        ))}
      </div>
      <Text
        mt={"48px"}
        mb={"16px"}
        fw={700}
        size={matches ? "34px" : "40px"}
        lh={matches ? "44px" : "48px"}
        c="#2B2A29"
        w="80%"
      >
        {data?.name}
      </Text>
      <div>
        <Text
          size="32px"
          lh="38px"
          td={data?.Prices?.discount && "line-through"}
          fw={700}
          color="orange.6"
          sx={{ lineHeight: 1 }}
        >
          AED {data?.Prices?.price}
        </Text>
        {data?.Prices?.discount ? (
          <Text
            fz="lg"
            mt={5}
            mb={5}
            fw={400}
            color="#6D6D6D"
            sx={{ lineHeight: 1 }}
          >
            AED {data?.Prices?.price_after_discount}
          </Text>
        ) : null}
        <Text
          fz="md"
          mb={matches ? "50px" : "0px"}
          color="#B2AFAE"
          fw={400}
          sx={{ lineHeight: 1 }}
          mt={3}
        >
          per day
        </Text>
      </div>
    </div>
  );
};

export default SliderSide;
