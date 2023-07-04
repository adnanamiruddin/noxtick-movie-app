import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ffc107",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#ffca28",
              contrastText: "#ffffff",
            },
            background: {
              paper: "#131313",
              default: "#000000",
            },
          }
        : {
            primary: {
              main: "#ffc107",
              contrastText: "#000000",
            },
            secondary: {
              main: "#ffca28",
              contrastText: "#000000",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
