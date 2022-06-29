import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signupUser from "../services/SignUpApi";
import swal from "sweetalert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isValidEmail === true &&
      isValidUsername === true &&
      isValidPassword === true
    ) {
      const response = await signupUser({
        email,
        username,
        password,
      });
      if (response.message === "User registered successfully!") {
        // console.log(response['accessToken'])
        swal("Success", "Bạn đã đăng ký tài khoản thành công!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          // localStorage.setItem('accessToken', response['accessToken']);
          // localStorage.setItem('username', JSON.stringify(response['username']));
          window.location.href = "/signin";
        });
      } else {
        // console.log(response)
        swal(
          "Failed",
          "Email hoặc tên tài khoản đã được sử dụng. Hãy thử lại!",
          "error"
        );
      }
    } else {
      swal(
        "Failed",
        "Thông tin bạn nhập vào chưa hợp lệ, hãy kiểm tra lại!",
        "error"
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                let temp = e.target.value;
                setEmail(e.target.value);
                if (
                  temp.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                ) {
                  setIsValidEmail(true);
                } else {
                  setIsValidEmail(false);
                }
              }}
            />
            {isValidEmail === false ? (
              <Typography variant="body2" color="red" fontSize="13px">
                *Email không đúng định dạng, hãy kiểm tra lại
              </Typography>
            ) : (
              <></>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => {
                let temp = e.target.value;
                setUsername(e.target.value);
                if (temp.length >= 6 && temp.length <= 30) {
                  setIsValidUsername(true);
                } else {
                  setIsValidUsername(false);
                }
              }}
            />
            {isValidUsername === false ? (
              <Typography variant="body2" color="red" fontSize="13px">
                *Tên đăng nhập phải lớn hơn 6 ký tự và nhỏ hơn 30 ký tự, hãy
                kiểm tra lại
              </Typography>
            ) : (
              <></>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                let temp = e.target.value;
                setPassword(e.target.value);
                if (
                  temp.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
                ) {
                  setIsValidPassword(true);
                } else {
                  setIsValidPassword(false);
                }
              }}
            />
            {isValidPassword === false ? (
              <Typography variant="body2" color="red" fontSize="13px">
                *Mật khẩu phải chứa ít nhất 8 ký tự bao gồm ít nhất 1 chữ cái
                hoa, 1 chữ cái thường, 1 số và không có kí tự đặc biệt
              </Typography>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký tài khoản
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
