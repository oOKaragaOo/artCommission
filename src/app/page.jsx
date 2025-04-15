"use client"

import React, {useState} from "react";
import HomePage from "./components/Homepage";

export default function Home() {
    const [sessionUser] = useState(null);
  return (
      <main>
          <HomePage sessionUser={sessionUser} />
      </main>
  );
}
