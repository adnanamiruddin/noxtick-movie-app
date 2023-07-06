import ProtectedPage from "../components/common/ProtectedPage";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetail from "../pages/MovieDetail";
import TopupBalance from "../pages/TopupBalance";
import Transactions from "../pages/Transactions";
import UserInfo from "../pages/UserInfo";
import WithdrawBalance from "../pages/WithdrawBalance";

export const routesGen = {
  home: "/",
  about: "/about",
  movieDetail: (movieTitle) => `/movie/${movieTitle}`,
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
    path: "/movies",
    element: <MoviesPage />,
    state: "movies",
  },
  {
    path: "/movie/:movieTitle",
    element: <MovieDetail />,
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
