"use client";

import { useState } from "react";
import { Customer } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface CustomersTableProps {
  initialCustomers: Customer[];
}

export default function CustomersTable({
  initialCustomers,
}: CustomersTableProps) {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track which customer is being deleted

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.location.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      // Remove the customer from the local state
      setCustomers(customers.filter((customer) => customer._id !== id));
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
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="border p-2 rounded dark:bg-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2"></th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, idx) => (
            <tr
              key={customer._id}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center"
            >
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.location}</td>
              <td className="border p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(customer._id)}
                  disabled={isDeleting === customer._id}
                  className="text-red-500 hover:text-red-700"
                >
                  {isDeleting === customer._id ? (
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
    </>
  );
}
