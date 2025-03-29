import ContactsTable from "@/components/ContactsTable";
import { Contacts as ContactsProps } from "../../types";

// Async function to fetch contacts data from the API
async function getContacts(): Promise<ContactsProps[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }
    const data = await res.json();
    return data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];  // Return an empty array in case of error
  }
}

// Main ContactsPage component
export default async function ContactsPage() {
  const contacts = await getContacts();

  if (!contacts.length) {
    return <div>Loading contacts..</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
