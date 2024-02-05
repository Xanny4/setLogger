import Login from "../components/Login";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/AddSetPage");
      return;
    }
  }, []);
  return <Login />;
};

export default LoginPage;
