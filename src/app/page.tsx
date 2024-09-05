"use client";
import { useGetMe } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Home() {
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  useEffect(() => {
    if (user) {
      if (user.role === "treasuryCentral") {
        push(`/${user.role}/register/cash`);
      } else {
        push(`/${user.role}`);
      }
    } else {
      push(`/logIn`);
    }
  }, [user]);
  return <></>;
}
