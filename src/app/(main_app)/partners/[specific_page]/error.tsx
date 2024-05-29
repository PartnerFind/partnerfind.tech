"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: "red",
      }}
    >
      <h1>500 Server Error </h1>
      <h3>
        Something went wrong! |{" "}
        <Link href="/" style={{ color: "red", textDecoration: "underline" }}>
          <strong>Go Back Home</strong>
        </Link>
      </h3>
    </div>
  );
};

export default Error;
