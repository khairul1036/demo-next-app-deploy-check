"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
}

const ProductBarChart: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Extract relevant fields
          const formattedData = result.data.map((product: Product) => ({
            name: product.name,
            price: product.price,
            discount: product.discount,
          }));

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Sales Price vs. Discount Chart
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" name="Price ($)" />
          <Bar dataKey="discount" fill="#82ca9d" name="Discount (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductBarChart;
