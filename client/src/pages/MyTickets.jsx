import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TicketItem from "../components/common/TicketItem";
import { useEffect, useState } from "react";
import userTicketApi from "../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import Container from "../components/common/Container";
import userApi from "../api/modules/user.api";
import { useNavigate } from "react-router-dom";
import uiConfigs from "../configs/ui.configs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import UserInfo from "../components/common/UserInfo";

const MyTickets = () => {
  const { user, listTickets } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [balance, setBalance] = useState(user.balance);

  useEffect(() => {
    const getTickets = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await userTicketApi.getTickets();
      dispatch(setGlobalLoading(false));

      if (response) {
        setTickets(response);
        setBalance(user.balance);
      }
      if (error) toast.error(error.message);
    };

    const getUserInfo = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));

      if (response) {
        setBalance(response.balance);
      }
      if (error) toast.error(error.message);
    };

    getTickets();
    getUserInfo();
  }, [user, listTickets, dispatch]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container>
        <UserInfo user={user} balance={balance} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <Typography variant="h5" textAlign="center">
                You do not have any tickets. Lets book some!
              </Typography>
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate("/movies")}
              >
                Book Ticket
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MyTickets;
