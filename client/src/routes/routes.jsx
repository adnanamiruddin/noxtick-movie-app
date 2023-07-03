import ProtectedPage from "../components/common/ProtectedPage";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";
import TopupBalance from "../pages/TopupBalance";
import Transactions from "../pages/Transactions";
import UserInfo from "../pages/UserInfo";
import WithdrawBalance from "../pages/WithdrawBalance";

export const routesGen = {
  home: "/",
  about: "/about",
  movieDetail: (movieId) => `/movie/${movieId}`,
  myInfo: "/my-info",
  transactions: "/transactions",
  topup: "/topup",
  withdraw: "/withdraw",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/about",
    element: <AboutPage />,
    state: "about",
  },
  {
    path: "/movie/:movieId",
    element: <MovieDetail />,
    state: "movie.detail",
  },
  {
    path: "/my-info",
    element: (
      <ProtectedPage>
        <UserInfo />
      </ProtectedPage>
    ),
    state: "info",
  },
  {
    path: "/transactions",
    element: (
      <ProtectedPage>
        <Transactions />
      </ProtectedPage>
    ),
    state: "transactions",
  },
  {
    path: "/topup",
    element: (
      <ProtectedPage>
        <TopupBalance />
      </ProtectedPage>
    ),
    state: "topup",
  },
  {
    path: "/withdraw",
    element: (
      <ProtectedPage>
        <WithdrawBalance />
      </ProtectedPage>
    ),
    state: "withdraw",
  },
];

export default routes;
