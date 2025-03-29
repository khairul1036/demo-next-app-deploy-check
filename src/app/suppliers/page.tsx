"use client"

import { useState, useEffect } from "react";
import SuppliersTable from "@/components/SuppliersTable";
import { Suppliers as SuppliersProps } from "../../types";

// Async function to fetch suppliers data from the API
async function getSuppliers(): Promise<SuppliersProps[]> {
  try {
    const res = await fetch(` /api/suppliers`);
    if (!res.ok) {
      throw new Error("Failed to fetch suppliers");
    }
    const data = await res.json();
    console.log("Fetched suppliers: ", data.data); // Log the fetched data for debugging
    return data.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return []; // Return an empty array in case of error
  }
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<SuppliersProps[]>([]); // State to store suppliers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // useEffect to fetch suppliers when the component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);  // Set loading state to true before fetching
      setError(null);  // Clear previous errors

      try {
        const fetchedSuppliers = await getSuppliers();
        setSuppliers(fetchedSuppliers);  // Update the suppliers state
      } catch (err) {
        setError("Failed to load suppliers.");  // Set error state if fetching fails
      } finally {
        setLoading(false);  // Set loading state to false after fetching
      }
    };

    fetchSuppliers();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading suppliers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Suppliers</h1>
      <SuppliersTable initialSuppliers={suppliers} />
    </div>
  );
};

export default Suppliers;
