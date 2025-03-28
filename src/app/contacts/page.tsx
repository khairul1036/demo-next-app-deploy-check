import ContactsTable from "@/components/ContactsTable";
import { Contacts as ContactsProps } from "../../types";
// Async function to fetch customer data from the API
async function getContacts(): Promise<ContactsProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
  const data = await res.json();
  console.log(data.contacts);
  return data.contacts;
}

const Contacts = async () => {
  const contacts = await getContacts();
  console.log("inside payments =====> ", contacts);
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-4">Contacts</h1>
        {/* Pass the fetched customer data to the CustomersTable component as a prop */}
        <ContactsTable initialContacts={contacts} />
      </div>
    </div>
  );
};

export default Contacts;
