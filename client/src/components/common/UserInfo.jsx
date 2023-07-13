import { Box, Typography } from '@mui/material'
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";

const UserInfo = ({user, balance}) => {
  return (
    <div>
      <Typography
          variant="h5"
          fontWeight="700"
          textAlign="center"
          textTransform="uppercase"
        >
          {user.displayName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-around",
            alignItems: "center",
            padding: 3,
            backgroundColor: "background.paper",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: { xs: 2, sm: 0 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <SettingsAccessibilityOutlinedIcon /> {user.age} Years Old
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AttachMoneyOutlinedIcon /> Rp.{balance}
          </Typography>
        </Box>
    </div>
  )
}

export default UserInfo