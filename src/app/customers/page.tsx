import CustomersTable from "@/components/CustomersTable";
import { Customer } from "../../types";

// Async function to fetch customer data from the API
async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`);
  const data = await res.json();
  console.log(data.data);
  return data.data;
}

// The main CustomersPage component that fetches and displays customer data
export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      {/* Pass the fetched customer data to the CustomersTable component as a prop */}
      <CustomersTable initialCustomers={customers} />
    </div>
  );
}
