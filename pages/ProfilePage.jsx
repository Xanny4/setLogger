import { useRouter } from "next/router";
import { React, useEffect } from "react";
import PersonalDetails from "../components/PersonalDetails";
import { Container, Paper, Typography } from "@mui/material";
import NavigationBar from "../components/NavigationBar";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage");
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "20px", marginLeft: 0 }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <PersonalDetails />
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
