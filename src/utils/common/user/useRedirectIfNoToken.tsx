import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectIfNoToken = () => {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);
};
