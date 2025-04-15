"use client"

import Navbar from "./components/Navbar";
import React, {useState} from "react";

export default function Home() {
    const [sessionUser] = useState(null);
  return (
      <main>
          <Navbar session={sessionUser} />
      </main>
  );
}
