import { Box, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MovieSlide from "../components/common/MovieSlide";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

const HomePage = () => {
  const [isShowing, setIsShowing] = useState(true);

  const springProps = useSpring({
    opacity: isShowing ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 1000 },
    onRest: () => setIsShowing(!isShowing),
  });

  return (
    <div>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container>
          <Stack spacing={4} marginY={4}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "600",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Welcome to NoxTick!
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              What do you want to watch today? Come on order your ticket and
              enjoy an exciting viewing experience with NoxTick.
            </Typography>
          </Stack>
          <Box>
            <animated.div style={springProps}>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  backgroundColor: "error.main",
                  textAlign: "center",
                  width: { xs: "75%", md: "65%" },
                  marginX: "auto",
                  marginBottom: "2rem",
                  paddingY: "10px",
                  borderRadius: "8px",
                }}
              >
                Now Showing
              </Typography>
            </animated.div>
          </Box>
        </Container>
      </Box>
      <MovieSlide />
      {/* <MoviePostersSlide /> */}
    </div>
  );
};

export default HomePage;
