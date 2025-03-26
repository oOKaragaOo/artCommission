"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
    const {data:session}=useSession();
  return (
      <main>
        <Navbar session={session} />

      </main>
  );
}
