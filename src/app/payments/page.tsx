import PaymentTable from "@/components/PaymentsTable";
import { Payments as PaymentsProps } from "../../types";
// Async function to fetch customer data from the API
async function getPayments(): Promise<PaymentsProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`);
  const data = await res.json();
  console.log(data.data);
  return data.data;
}

const Payments = async () => {
  const payments = await getPayments();
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Products</h1>
        {/* Pass the fetched customer data to the CustomersTable component as a prop */}
        <PaymentTable initialPayments={payments} />
      </div>
    </div>
  );
};

export default Payments;
