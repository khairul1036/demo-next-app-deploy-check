"use client";

import { useState } from "react";
import { Payments } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface PaymentsTableProps {
  initialPayments: Payments[];
}

export default function PaymentTable({
  initialPayments: initialPayments,
}: PaymentsTableProps) {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState<Payments[]>(initialPayments);
  const [sortPayments, setSortPayments] = useState<"newest" | "oldest">(
    "newest"
  );
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customerName.toLowerCase().includes(search.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      payment.customerLocation.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPayments = filteredPayments.sort((a, b) => {
    switch (sortPayments) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete payments");
      }

      setPayments(payments.filter((payment) => payment._id !== id));
      alert("Payment deleted successfully");
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Failed to delete payment");
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
            value={sortPayments}
            onChange={(e) =>
              setSortPayments(e.target.value as "newest" | "oldest")
            }
            className="border p-2 rounded dark:bg-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
          <thead>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Pay Bill</th>
              <th className="border p-2">Due</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Transation ID</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Payment Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment, idx) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center"
              >
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{payment.customerName}</td>
                <td className="border p-2">{payment.customerEmail}</td>
                <td className="border p-2">{payment.customerLocation}</td>
                <td className="border p-2">{payment.paybill}</td>
                <td className="border p-2">{payment.due}</td>
                <td className="border p-2">{payment.status}</td>
                <td className="border p-2">{payment.trxId}</td>
                <td className="border p-2">{payment.paymentMethod}</td>
                <td className="border p-2">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(payment._id)}
                    disabled={isDeleting === payment._id}
                    className="text-red-500 hover:text-red-700"
                  >
                    {isDeleting === payment._id ? (
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
