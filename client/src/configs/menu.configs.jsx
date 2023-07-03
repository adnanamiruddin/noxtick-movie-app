import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

const main = [
  {
    title: "Home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    title: "About",
    path: "/about",
    icon: <HelpCenterOutlinedIcon />,
    state: "about",
  },
];

const user = [
  {
    title: "My Info",
    path: "/my-info",
    icon: <InfoOutlinedIcon />,
    state: "info",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <PointOfSaleOutlinedIcon />,
    state: "transactions",
  },
  {
    title: "Top Up",
    path: "/topup",
    icon: <PaidOutlinedIcon />,
    state: "topup",
  },
  {
    title: "Withdraw",
    path: "/withdraw",
    icon: <AccountBalanceWalletOutlinedIcon />,
    state: "withdraw",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
