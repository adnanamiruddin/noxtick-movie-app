import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

const main = [
  {
    title: "Home",
    path: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
  },
];

const user = [
  {
    title: "My Info",
    path: "/my-info",
    icon: <InfoOutlinedIcon />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <PointOfSaleOutlinedIcon />,
  },
  {
    title: "Top Up",
    path: "/topup",
    icon: <PaidOutlinedIcon />,
  },
  {
    title: "Withdraw",
    path: "/withdraw",
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
