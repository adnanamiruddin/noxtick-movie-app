import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListTickets, setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";
import userTicketApi from "../../api/modules/user.ticket.api";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import HeaderNavbar from "../common/HeaderNavbar";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getUserTickets = async () => {
      const { response, error } = await userTicketApi.getTickets();

      if (response) dispatch(setListTickets(response));
      if (error) dispatch(error.message);
    };

    if (user) getUserTickets();
    if (!user) dispatch(setListTickets([]));
  }, [user, dispatch]);

  return (
    <div>
      {/* Global Loading START */}
      <GlobalLoading />
      {/* Global Loading END */}

      <Box display="flex" minHeight="100vh">
        {/* Header Section START */}
        <HeaderNavbar />
        {/* Header Section END */}

        {/* Main Section START */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main Section END */}
      </Box>
    </div>
  );
};

export default MainLayout;
