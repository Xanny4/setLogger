import React, { useEffect } from "react";
import AddSet from "../components/AddSet";
import NavigationBar from "../components/NavigationBar";
import { useRouter } from "next/router";

const AddSetPage = () => {
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
      <AddSet />
    </>
  );
};

export default AddSetPage;
