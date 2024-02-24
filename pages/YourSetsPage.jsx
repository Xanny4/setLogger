import React, { useEffect } from "react";
import AddSet from "../components/AddSet";
import NavigationBar from "../components/NavigationBar";
import { useRouter } from "next/router";
import SetsTable from "../components/SetsTable";

const AddSetPage = () => {
  const router = useRouter();
  const { exercise } = router.query;
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage");
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <SetsTable exercise={exercise} />
    </>
  );
};

export default AddSetPage;
