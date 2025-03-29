"use client"

import { useState, useEffect } from "react";
import OrdersTable from "@/components/OrdersTable";
import { Orders as OrdersType } from "../../types";

// Async function to fetch orders data from the API
async function getOrders(): Promise<OrdersType[]> {
  try {
    const res = await fetch(` /api/orders`);
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await res.json();
    console.log(data.data); // This is the data structure you are logging
    return data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return []; // Return an empty array in case of error
  }
}

const Orders = () => {
  const [orders, setOrders] = useState<OrdersType[]>([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);  // Set loading state to true before fetch
      setError(null);  // Clear any previous errors

      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);  // Update orders state
      } catch (err) {
        setError("Failed to load orders.");  // Set error if fetching fails
      } finally {
        setLoading(false);  // Set loading state to false after fetch is done
      }
    };

    fetchOrders();
  }, []);  // Empty dependency array means this will run once on mount

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <OrdersTable initialOrders={orders} />
    </div>
  );
};

export default Orders;
