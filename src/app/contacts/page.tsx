"use client"

import { useState, useEffect } from "react";
import ContactsTable from "@/components/ContactsTable";
import { Contacts as ContactsProps } from "../../types";

// Async function to fetch contacts data from the API
async function getContacts(): Promise<ContactsProps[]> {
  try {
    const res = await fetch(`/api/contacts`);
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
export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactsProps[]>([]);  // State to store contacts
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  // useEffect to fetch contacts data when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);  // Set loading state to true before fetch
      setError(null);  // Clear any previous errors

      try {
        const fetchedContacts = await getContacts();
        setContacts(fetchedContacts);  // Update contacts state
      } catch (err) {
        setError("Failed to load contacts.");  // Set error if fetching fails
      } finally {
        setLoading(false);  // Set loading state to false after fetch is done
      }
    };

    fetchContacts();
  }, []);  // Empty dependency array means this will run once on mount

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      <ContactsTable initialContacts={contacts} />
    </div>
  );
}
