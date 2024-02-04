import Login from "../components/Login";
import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";

const sessionExists = () => {
  // Example: Check if a session key exists in localStorage
  return localStorage.getItem("sessionKey") !== null;
};

export default function App() {
  const router = useRouter();

  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  useEffect(() => {
    // Check for session on the client-side
    if (!sessionExists()) {
      router.push("/LoginPage"); // Redirect to login page
    } else router.push("/AddSetPage");
  }, []);
}
