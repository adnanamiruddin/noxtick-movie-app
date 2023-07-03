import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeModes } from "../../configs/theme.configs";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    treshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const HeaderNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  return (
    <div>
      <ScrollAppBar>
        <AppBar>
          <Toolbar
            sx={{
              marginTop: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Mobile View (Hamburger Icon) START */}
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              {/* Mobile View (Hamburger Icon) END */}

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>

              {/* Main Menu Section START */}
              <Box
                flexGrow={1}
                alignItems="center"
                display={{ xs: "none", md: "flex" }}
              >
                <Box sx={{ marginRight: "35px" }}>
                  <Logo />
                </Box>
                {menuConfigs.main.map((menu, i) => (
                  <Button
                    key={i}
                    sx={{
                      color: appState.includes(menu.state)
                        ? "primary.contrastText"
                        : "inherit",
                      marginRight: 3,
                    }}
                    LinkComponent={Link}
                    to={menu.path}
                    variant={
                      appState.includes(menu.state) ? "contained" : "text"
                    }
                  >
                    {menu.title}
                  </Button>
                ))}
                <IconButton sx={{ color: "inherit" }}>
                  {themeMode === themeModes.dark ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    ""
                  )}
                  {themeMode === themeModes.light ? (
                    <WbSunnyOutlinedIcon />
                  ) : (
                    ""
                  )}
                </IconButton>
              </Box>
              {/* Main Menu Section END */}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </div>
  );
};

export default HeaderNavbar;
