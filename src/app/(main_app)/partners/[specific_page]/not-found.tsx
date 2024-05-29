import Link from "next/link";

export default function NotFound() {
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
      <h1>
        404 Not Found! |{" "}
        <Link href="/" style={{ color: "red", textDecoration: "underline" }}>
          <strong>Go Back Home</strong>
        </Link>
      </h1>
    </div>
  );
}
