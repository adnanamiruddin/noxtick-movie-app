import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import uiConfigs from "../../configs/ui.configs";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [anchorElement, setAnchorElement] = useState(null);

  const toggleMenu = (e) => setAnchorElement(e.currentTarget);

  const handleLogout = () => {
    dispatch(setUser(null));
    setAnchorElement(null);
    navigate("/")
  }

  return (
    <div>
      {user ? (
        <Box>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              userSelect: "none",
              marginTop: { xs: 0.5, md: 0 },
              fontSize: { xs: "1.1rem", sm: "1.5rem" },
              ...uiConfigs.style.typoLines(1, "center"),
            }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            onClose={() => setAnchorElement(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((menu, i) => (
              <ListItemButton
                key={i}
                LinkComponent={Link}
                to={menu.path}
                onClick={() => setAnchorElement(null)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {menu.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>LOG OUT</Typography>}
              />
            </ListItemButton>
          </Menu>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserMenu;
