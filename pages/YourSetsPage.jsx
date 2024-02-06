import React, { useEffect } from "react";
import AddSet from "../components/AddSet";
import NavigationBar from "../components/NavigationBar";
import { useRouter } from "next/router";
import SetsTable from "../components/SetsTable";

const AddSetPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage"); // Redirect to login if not authenticated
    }
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
    <>
      <NavigationBar />
      <SetsTable hasExercise={null} />
    </>
  );
};

export default AddSetPage;
