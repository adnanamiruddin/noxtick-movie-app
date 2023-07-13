import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TicketItem from "../components/common/TicketItem";
import { useEffect, useState } from "react";
import userTicketApi from "../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import Container from "../components/common/Container";
import userApi from "../api/modules/user.api";

const MyTickets = () => {
  const { user, listTickets } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [tickets, setTickets] = useState([]);
  const [balance, setBalance] = useState(user.balance);

  useEffect(() => {
    const getTickets = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await userTicketApi.getTickets();
      dispatch(setGlobalLoading(false));

      if (response) {
        setTickets(response);
        setBalance(user.balance)
      }
      if (error) toast.error(error.message);
    };

    const getUserInfo = async () => {
      dispatch(setGlobalLoading(true));
      const {response, error} = await userApi.getInfo();
      dispatch(setGlobalLoading(false));

      if (response) {
        setBalance(response.balance)
      }
      if (error) toast.error(error.message);
    }

    getTickets();
    getUserInfo();
  }, [user, listTickets, dispatch]);

  return (
    <Box sx={{ margin: "auto", padding: 2 }}>
      <Container>
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
          <Typography variant="h6" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
            Age: {user.age}
          </Typography>
          <Typography variant="h6">Balance: Rp.{balance}</Typography>
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
