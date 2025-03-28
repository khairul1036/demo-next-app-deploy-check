import SuppliersTable from "@/components/SuppliersTable";
import { Suppliers as SuppliersProps } from "../../types";
// Async function to fetch customer data from the API
async function getSuppliers(): Promise<SuppliersProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers`);
  const data = await res.json();
  return data.data;
}

const Suppliers = async () => {
  const suppliers = await getSuppliers();
  console.log("inside payments =====> ", suppliers);
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Supplies</h1>
        {/* Pass the fetched customer data to the CustomersTable component as a prop */}
        <SuppliersTable initialSuppliers={suppliers} />
      </div>
    </div>
  );
};

export default Suppliers;
