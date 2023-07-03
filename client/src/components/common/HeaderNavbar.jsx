import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeModes } from "../../configs/theme.configs";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import SideNavbar from "./SideNavbar";
import UserMenu from "./UserMenu";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

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

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSideNavbar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      {/* Navbar For Mobile View (Active Hamburger Icon) START */}
      <SideNavbar open={sidebarOpen} toggleSideNavbar={toggleSideNavbar} />
      {/* Navbar For Mobile View (Active Hamburger Icon) END */}

      {/* Navbar For Tab/Desktop/etc */}
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{
              marginTop: "5px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Mobile View (Hamburger Icon) START */}
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSideNavbar}
              >
                <MenuIcon />
              </IconButton>
              {/* Mobile View (Hamburger Icon) END */}

              {/* Mobile View Icon START */}
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
              {/* Mobile View Icon END */}
            </Stack>

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
                  variant={appState.includes(menu.state) ? "contained" : "text"}
                >
                  {menu.title}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark ? <DarkModeOutlinedIcon /> : ""}
                {themeMode === themeModes.light ? <WbSunnyOutlinedIcon /> : ""}
              </IconButton>
            </Box>
            {/* Main Menu Section END */}

            {/* User Menu Section START */}
            {/* If User Already Sign In START */}
            {user ? <UserMenu /> : ""}
            {/* If User Already Sign In END */}

            {/* If User Haven't Sign In START */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user ? (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign In
                </Button>
              ) : (
                ""
              )}
            </Stack>
            {/* If User Haven't Sign In END */}
            {/* User Menu Section END */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </div>
  );
};

export default HeaderNavbar;
