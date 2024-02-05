import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      setError(null);
      setSuccessMessage(null); // Reset error state on each form submission

      if (isSignUpMode) {
        console.log("Signup logic here");
        if (!(formData.confirmPassword === formData.password)) {
          setError("Confirm password is invalid!");
          return;
        }
        const response = await axios.post("http://localhost:3000/api/users/", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (response.data.user) {
          setSuccessMessage("Signed up successfully!");
          sessionStorage.setItem("token", response.data.token);
        } else setError(response.data.message);
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/users/authenticate",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        const user = response.data.user;
        if (!user) {
          setError(response.data.message);
          return;
        }
        setSuccessMessage(response.data.message);
        sessionStorage.setItem("token", response.data.token);

        console.log("Login successful. User data:", user);
        router.push("/AddSetPage");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
    setError(null); // Reset error state when toggling mode
    setSuccessMessage(null);
  };

  return (
    <div style={styles.centeredContainer}>
      <Container maxWidth="sm">
        <Paper elevation={3} style={styles.loginContainer}>
          <Typography variant="h4" align="center" gutterBottom>
            {isSignUpMode ? "Sign Up" : "Login"}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            {isSignUpMode && (
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>
                  Username:
                </label>
                <TextField
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  fullWidth
                  variant="outlined"
                />
              </div>
            )}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <TextField
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
                fullWidth
                variant="outlined"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password:
              </label>
              <TextField
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                required
                fullWidth
                variant="outlined"
              />
            </div>
            {isSignUpMode && (
              <div style={styles.formGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm Password:
                </label>
                <TextField
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  fullWidth
                  variant="outlined"
                />
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.button}
            >
              {isSignUpMode ? "Sign Up" : "Login"}
            </Button>
          </form>
          {successMessage && (
            <Typography
              variant="body2"
              align="center"
              style={styles.successText}
            >
              {successMessage}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" align="center" style={styles.errorText}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center" style={styles.toggleText}>
            {isSignUpMode
              ? "Already have an account? "
              : "Don't have an account? "}
            <span style={styles.toggleLink} onClick={toggleMode}>
              {isSignUpMode ? "Login" : "Sign Up"}
            </span>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

const styles = {
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginContainer: {
    padding: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
  },
  toggleText: {
    marginTop: "10px",
  },
  toggleLink: {
    color: "#1976D2",
    cursor: "pointer",
    textDecoration: "underline",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
  },
  successText: {
    color: "green",
    marginTop: "10px",
  },
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default Login;
