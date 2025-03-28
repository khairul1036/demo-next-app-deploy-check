import ProductsTable from "@/components/ProductsTable";
import { Products as ProductsProps } from "../../types";
// Async function to fetch customer data from the API
async function getProducts(): Promise<ProductsProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const data = await res.json();
  console.log(data.data);
  return data.data;
}

const Products = async () => {
  const products = await getProducts();
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Products</h1>
        {/* Pass the fetched customer data to the CustomersTable component as a prop */}
        <ProductsTable initialProducts={products} />
      </div>
    </div>
  );
};

export default Products;
