"use client"; // Ensure it runs on the client side

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

interface Product {
  category: string;
  rating: number;
  reviews: number;
}

const ProductLineChart: React.FC = () => {
  const [data, setData] = useState<
    { category: string; avgRating: number; totalReviews: number }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Group data by category
          const categoryMap: Record<
            string,
            { totalRating: number; totalReviews: number; count: number }
          > = {};

          result.data.forEach((product: Product) => {
            const { category, rating, reviews } = product;

            if (!categoryMap[category]) {
              categoryMap[category] = {
                totalRating: 0,
                totalReviews: 0,
                count: 0,
              };
            }

            categoryMap[category].totalRating += rating;
            categoryMap[category].totalReviews += reviews;
            categoryMap[category].count += 1;
          });

          // Format data for the chart
          const formattedData = Object.keys(categoryMap).map((category) => ({
            category,
            avgRating: parseFloat(
              (
                categoryMap[category].totalRating / categoryMap[category].count
              ).toFixed(1)
            ), // Average rating
            totalReviews: categoryMap[category].totalReviews, // Total reviews
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
        Category-wise Ratings vs. Reviews
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.totalReviews} Reviews, Avg Rating: ${props.payload.avgRating}`,
              "Data",
            ]}
          />

          {/* Reviews Line */}
          <Line
            type="monotone"
            dataKey="totalReviews"
            stroke="#8884d8"
            strokeWidth={2}
            name="Total Reviews"
            dot={(props) => (
              <Dot
                {...props}
                fill={props.payload.avgRating >= 4.5 ? "#00C49F" : "#FFBB28"}
                r={6}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductLineChart;
