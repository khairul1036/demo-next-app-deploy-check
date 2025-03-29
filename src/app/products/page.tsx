"use client"

import { useState, useEffect } from "react";
import ProductsTable from "@/components/ProductsTable";
import { Products as ProductsProps } from "../../types";

// Async function to fetch products data from the API
async function getProducts(): Promise<ProductsProps[]> {
  try {
    const res = await fetch(` /api/products`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    console.log(data.data); // Log data for debugging
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of error
  }
}

const Products = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);  // Set loading state to true before fetching
      setError(null);  // Clear previous errors

      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);  // Update the products state
      } catch (err) {
        setError("Failed to load products.");  // Set error state if fetching fails
      } finally {
        setLoading(false);  // Set loading state to false after fetching
      }
    };

    fetchProducts();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ProductsTable initialProducts={products} />
    </div>
  );
};

export default Products;
