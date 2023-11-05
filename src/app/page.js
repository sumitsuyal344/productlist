"use client"
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Product = dynamic(() => import("@/components/product"), { ssr: false });

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        router.replace("/");
      } else {
        setIsLoggedIn(false);
        router.replace("/login");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Product setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
