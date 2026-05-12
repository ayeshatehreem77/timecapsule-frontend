import { useEffect } from "react";

export default function PaymentSuccess() {

  useEffect(() => {
    alert("Payment successful! Please login again.");

    localStorage.clear();

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Processing Payment...</h2>
    </div>
  );
}