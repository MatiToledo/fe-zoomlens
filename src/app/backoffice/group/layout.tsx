"use client";
import Header from "@/components/header";
import BOHeader from "@/components/header/backoffice";
import React, { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function UserLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(cookies.user);
  }, [cookies.user]);

  if (!user) {
    return null; // Evita la renderización inicial hasta que las cookies estén disponibles
  }
  return (
    <Fragment>
      <BOHeader user={cookies.user} />
      <div className="bg-default-300  max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)]">
        {children}
      </div>
    </Fragment>
  );
}
