// /payments/page.tsx (Client-side fetching example)

"use client"
import React, { useEffect, useState } from 'react';
import PaymentTable from "@/components/PaymentsTable";
import { Payments as PaymentsProps } from "../../types";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentsProps[]>([]);

  // UseEffect hook to fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`);
      const data = await res.json();
      setPayments(data.data);  // Store the fetched payments in state
    }

    fetchData();
  }, []);  // Empty dependency array ensures the data is fetched only once when the component mounts

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Payments</h1>
      <PaymentTable initialPayments={payments} />
    </div>
  );
}
