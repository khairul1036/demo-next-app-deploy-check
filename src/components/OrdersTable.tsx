"use client";

import { useState } from "react";
import { Orders } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface OrdersTableProps {
  initialOrders: Orders[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Orders[]>(initialOrders);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "totalPriceAsc" | "totalPriceDesc"
  >("newest");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerLocation.toLowerCase().includes(search.toLowerCase()) ||
      order.category.toLowerCase().includes(search.toLowerCase()) ||
      order.productName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "totalPriceAsc":
        return a.totalPrice - b.totalPrice;
      case "totalPriceDesc":
        return b.totalPrice - a.totalPrice;
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setOrders(orders.filter((order) => order._id !== id));
      alert("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="items-center flex">
          <Input
            type="search"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded mb-4 w-[50vw] dark:bg-gray-700 pr-10"
          />
          <Button className="relative -left-12 bottom-2 bg-transparent dark:text-white text-black shadow-none hover:bg-transparent">
            <Search />
          </Button>
        </div>
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as
                  | "newest"
                  | "oldest"
                  | "totalPriceAsc"
                  | "totalPriceDesc"
              )
            }
            className="border p-2 rounded dark:bg-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="totalPriceAsc">Total Price (Low to High)</option>
            <option value="totalPriceDesc">Total Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
          <thead>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Product Price</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Order Date</th>
              <th className="border p-2">Total Quantity</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center"
              >
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">{order.customerEmail}</td>
                <td className="border p-2">{order.productName}</td>
                <td className="border p-2">{order.productPrice}</td>
                <td className="border p-2">{order.brand}</td>
                <td className="border p-2">{order.category}</td>
                <td className="border p-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="border p-2">{order.totalQuantity}</td>
                <td className="border p-2">{order.totalPrice}</td>
                <td className="border p-2">{order.customerLocation}</td>
                <td className="border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(order._id)}
                    disabled={isDeleting === order._id}
                    className="text-red-500 hover:text-red-700"
                  >
                    {isDeleting === order._id ? (
                      "Deleting..."
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
