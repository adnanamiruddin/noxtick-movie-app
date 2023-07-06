import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

import { EffectCoverflow } from "swiper";

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView={3}
        grabCursor={true}
        loop={true}
        style={{ width: "100%", height: "max-content" }}
        initialSlide={Math.floor(Math.random() * 30)}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow]}
        breakpoints={{
          900: {
            slidesPerView: 5,
          },
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
