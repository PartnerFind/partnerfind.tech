'use client'

import { DataTable } from "@/components/table/data-table";
import { ColumnsPartnerDef, columns } from "@/components/table/columns";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';

interface Item1 {
  category: string;
  name: string;
  type: string;
  description: string;
  resources: string;
  phonenumber: string;
  email: string;
}

interface Item2 {
  userID: string
  name: string;
}

async function fetchAllTableData(userId: string): Promise<any> { // fetch all the partners as well as user specific partners list
  try {
    const options: RequestInit = {
      // next: { revalidate: 0 }, // this request is also cached with a lifetime of 10 seconds
      // cache: 'no-store', // don't cache the response
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ userID: userId }), // Pass the user ID to the backend
    };

    const getAllRows = await fetch('/api/db/fetch-all-rows-with-user', options); 
    if (getAllRows.ok) {
      const info = await getAllRows.json();
     
      return info;
    } else {
      throw new Error("Error fetching rows from DB.");
    }
  } catch (error) {
    console.error("An error occurred while fetching from the DB:", error);
    alert("An error occurred while fetching from the DB.");
    throw error;
  }
}

export default function ExploreTable() {
  const [info, setInfo] = useState<any>([]);
  const { userId } = useAuth(); // get current logged in user ID

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      try {
        if (userId) {
          const newData = await fetchAllTableData(userId);
          setInfo(newData);
        }
      } catch (error) {
        console.error("An error occurred while fetching from the DB:", error);
        alert("An error occurred while fetching from the DB.");
      }
    }

    if (info.length === 0) { // Check if data is empty before fetching
      fetchDataAndUpdateState();
    }
  }, [info]); // Only re-run effect if data changes

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={ columns } data={ info } />
    </div>
  );
}