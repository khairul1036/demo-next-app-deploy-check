"use client"; // Ensure it runs on the client side

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Product {
  _id: string;
  category: string;
  stock: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
];

const ProductPieChart: React.FC = () => {
  const [data, setData] = useState<{ category: string; stock: number }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Group products by category and sum their stock
          const categoryStockMap: Record<string, number> = {};

          result.data.forEach((product: Product) => {
            if (categoryStockMap[product.category]) {
              categoryStockMap[product.category] += product.stock;
            } else {
              categoryStockMap[product.category] = product.stock;
            }
          });

          // Convert the object into an array for Recharts
          const formattedData = Object.keys(categoryStockMap).map(
            (category) => ({
              category,
              stock: categoryStockMap[category],
            })
          );

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
        Stock Availability by Category
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="stock"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPieChart;
