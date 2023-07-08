import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TicketItem from "../components/common/TicketItem";
import { useEffect, useState } from "react";
import userTicketApi from "../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";

const MyTickets = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await userTicketApi.getTickets();
      dispatch(setGlobalLoading(false));

      if (response) setTickets(response);
      if (error) toast.error(error.message);
    };

    getTickets();
  }, [user, dispatch]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container>
        <Typography variant="h4" fontWeight="700" textAlign="center">
          {user.displayName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 3,
            backgroundColor: "background.paper",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Age: {user.age}</Typography>
          <Typography variant="h5">Balance: Rp.{user.balance}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {tickets.map((ticket, i) => (
            <TicketItem key={i} ticket={ticket} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MyTickets;
