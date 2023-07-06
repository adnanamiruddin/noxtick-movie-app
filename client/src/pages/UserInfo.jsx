import { Box, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TicketItem from "../components/common/TicketItem";
import { useEffect, useState } from "react";
import userTicketApi from "../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const UserInfo = () => {
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
  }, [user]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        My Info
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "0 10%",
          padding: 2,
          backgroundColor: "background.paper",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ marginRight: 4 }}>
          <Typography variant="h6" gutterBottom>
            {user.displayName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            Age: {user.age}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Balance: Rp.{user.balance}
          </Typography>
        </Box>
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
    </Box>
  );
};

export default UserInfo;
