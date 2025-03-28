// /customers/page.tsx (Client-side fetching example)
"use client"
import React, { useEffect, useState } from 'react';
import CustomersTable from "@/components/CustomersTable";
import { Customer } from "../../types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
      const data = await res.json();
      setCustomers(data.data);
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <CustomersTable initialCustomers={customers} />
    </div>
  );
}
