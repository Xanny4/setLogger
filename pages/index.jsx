import React from "react";
import HomePage from "./HomePage";
import Login from "../components/Login";

export default function App() {
  // You can use React state or routing to conditionally render components
  const isLoggedIn = false; // Set this based on your authentication state

  return <>{isLoggedIn ? <HomePage /> : <Login />}</>;
}
