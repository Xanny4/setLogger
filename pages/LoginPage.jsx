import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div style={styles.container}>
      {/* You can add a header or other components specific to the login page here */}
      <Login />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Optional: Adjust the height based on your needs
  },
};

export default LoginPage;
