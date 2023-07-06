import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MovieSlide from "../components/common/MovieSlide";
// import MoviePostersSlide from "../components/common/MoviePostersSlide";

const HomePage = () => {
  return (
    <div>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={4} marginY={4}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "600", alignSelf: "center", textAlign: "center" }}
          >
            Welcome to NoxTick!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            What do you want to watch today? Come on order your ticket and enjoy an
            exciting viewing experience with NoxTick.
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container>
          <MovieSlide />
        </Container>
      </Box>
      {/* <MoviePostersSlide /> */}
    </div>
  );
};

export default HomePage;
