// /contacts/page.tsx
import ContactsTable from "@/components/ContactsTable";
import { Contacts as ContactsProps } from "../../types";

// Async function to fetch contacts data from the API
async function getContacts(): Promise<ContactsProps[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
  const data = await res.json();
  // console.log(data.contacts);
  return data.contacts;
}

// Main ContactsPage component
export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
