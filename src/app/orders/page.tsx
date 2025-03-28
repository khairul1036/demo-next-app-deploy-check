import OrdersTable from "@/components/OrdersTable";
import { Orders as OrdersType } from "../../types";
import React from "react";
// Async function to fetch customer data from the API
async function getOrders(): Promise<OrdersType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
  const data = await res.json();
  console.log(data.data);
  return data.data;
}

const Orders = async () => {
  const orders = await getOrders();
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Orders</h1>
        {/* Pass the fetched customer data to the CustomersTable component as a prop */}
        <OrdersTable initialOrders={orders} />
      </div>
    </div>
  );
};

export default Orders;
