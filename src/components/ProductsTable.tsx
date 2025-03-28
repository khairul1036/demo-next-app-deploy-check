"use client";

import { useState } from "react";
import { Products } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface ProductsTableProps {
  initialProducts: Products[];
}

export default function ProductsTable({ initialProducts }: ProductsTableProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [sortProduct, setSortProduct] = useState<"newest" | "oldest">("newest");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (order) =>
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.category.toLowerCase().includes(search.toLowerCase()) ||
      order.brand.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortProduct) {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setProducts(products.filter((product) => product._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
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
            value={sortProduct}
            onChange={(e) =>
              setSortProduct(e.target.value as "newest" | "oldest")
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
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Warranty</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, idx) => (
              <tr
                key={product._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center"
              >
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.discount}</td>
                <td className="border p-2">{product.brand}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.rating}</td>
                <td className="border p-2">{product.warranty}</td>
                <td className="border p-2">{product.warranty}</td>
                <td className="border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                    disabled={isDeleting === product._id}
                    className="text-red-500 hover:text-red-700"
                  >
                    {isDeleting === product._id ? (
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
