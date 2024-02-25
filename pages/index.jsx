import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage");
    } else router.push("/AddSetPage");
  }, []);
}
