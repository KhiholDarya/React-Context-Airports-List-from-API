import { Box, Button, Container, IconButton, Snackbar, TextField } from '@mui/material';
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [ loginStatus, setLoginStatus] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    if (location.pathname === "/signIn") {
      setLoginStatus("login");
    } else if (location.pathname === "/signOut") {
      setLoginStatus("register");
    }
  }, [location]);

 const handleLogin = (event) => {
    event.preventDefault();
    const availableUsers = JSON.parse(localStorage.getItem("availableUsers")) || [];
    const user = availableUsers.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setErrorStatus(true);
		setErrorMessage("User is not found in the system");
    }
  };


  const handleRegisterAndLogin = () => {
    const user = {
      username: username,
      password: password,
    };
    const availableUsers = JSON.parse(localStorage.getItem("availableUsers")) || [];

    const userExists = availableUsers.some(availableUser => availableUser.username === username && availableUser.password === password);
    if (userExists) {
		setErrorStatus(true);
      setErrorMessage("User is already exists");
      return;
    }

    availableUsers.push(user);
    localStorage.setItem("availableUsers", JSON.stringify(availableUsers));
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };
  
  const goToLoginPage = () => {
	navigate("/signIn");
	setLoginStatus("login");
  };

  const goToRegisterPage = () => {
	navigate("/signOut");
	setLoginStatus("register");
  }

  const handleClose = () => {
	setErrorStatus(false)
	}

  const action = (
	<React.Fragment>
	<Button color="secondary" size="small" onClick={handleClose}>
		Close
	</Button>
	<IconButton
		size="small"
		aria-label="close"
		color="inherit"
		onClick={handleClose}
	>
	</IconButton>
	</React.Fragment>
 );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="xs">
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Login"
            required
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            required
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
			{loginStatus === "login" ? (
				<>
			<Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
			<Button variant="contained" color="primary" onClick={goToRegisterPage}>
          Go to Register
        </Button>
				</>) : (
				<>
          <Button variant="contained" color="secondary" onClick={handleRegisterAndLogin}>
            Register and Login
          </Button>
        <Button variant="contained" color="primary" onClick={goToLoginPage}>
          Go to Login
        </Button>
				</>
			)}
		</form>
	<Snackbar
		open={errorStatus}
		autoHideDuration={3000}
		onClose={handleClose}
		action={action}
		message={errorMessage}
/>
      </Container>
    </Box>
  );
};

export default Login;
