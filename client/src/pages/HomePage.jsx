import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container"
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
            Selamat datang di NoxTick!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Mau nonton apa hari ini? Skuy pesan tiketmu dan nikmati pengalaman
            menonton yang seru bersama NoxTick.
          </Typography>
        </Stack>
      </Box>
      <Box sx={{...uiConfigs.style.mainContent}}>
        <Container>
          <MovieSlide />
        </Container>
      </Box>
      {/* <MoviePostersSlide /> */}
    </div>
  );
};

export default HomePage;
