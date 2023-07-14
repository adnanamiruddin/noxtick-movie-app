import { Box, Typography } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";

const UserDetail = () => {
  const { user, listTickets } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));

      if (response) setBalance(response.balance);
      if (error) toast.error(error.message);
    };

    getUserInfo();
  }, [user, listTickets, dispatch]);

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="700"
        textAlign="center"
        textTransform="uppercase"
        marginBottom={2}
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
            marginBottom: { xs: 3, sm: 0 },
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
  );
};

export default UserDetail;
