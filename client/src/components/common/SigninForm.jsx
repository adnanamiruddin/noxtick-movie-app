import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";
import { setBalance } from "../../redux/features/userBalanceSlice";
import userBalanceApi from "../../api/modules/user.balance.api";

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const getUserBalance = async () => {
      const { response, error } = await userBalanceApi.getBalance();
      if (response) {
        setUserBalance(response.balanceAmount);
      }
      if (error) toast.error(error.message);
    };

    getUserBalance();
  }, []);

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Minimum 8 characters for user name")
        .required("User name is required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters for password")
        .required("Password is required!"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, error } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setBalance(userBalance))
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username..."
          name="username"
          value={signinForm.values.username}
          fullWidth
          color="success"
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.username && signinForm.errors.username}
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
        />
        <TextField
          type="password"
          placeholder="password..."
          name="password"
          value={signinForm.values.password}
          fullWidth
          color="success"
          onChange={signinForm.handleChange}
          helperText={signinForm.touched.password && signinForm.errors.password}
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        loading={isLoginRequest}
        fullWidth
        sx={{ marginTop: 4 }}
        size="large"
        variant="contained"
      >
        Sign In
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign Up
      </Button>

      {errorMessage ? (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SigninForm;
