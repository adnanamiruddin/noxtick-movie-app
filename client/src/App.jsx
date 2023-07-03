import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
  return (
    <div>
      {/* Config React Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      {/* Config React Toastify END */}

      {/* Material UI reset CSS START */}
      <CssBaseline />
      {/* Material UI reset CSS END */}

      {/* App Routest START */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* App Routest END */}
    </div>
  );
};

export default App;
