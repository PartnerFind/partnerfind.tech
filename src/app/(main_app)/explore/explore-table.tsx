'use client'

import { DataTable } from "@/components/table/data-table";
import { ColumnsPartnerDef, columns } from "@/components/table/columns";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/clerk-react';

async function fetchAllTableData(userId: string): Promise<any> { // fetch all the partners as well as user specific partners list
  try {
    const getAllRows = await fetch(`/api/db/fetch-all-rows`, { next: { revalidate: 10 } }); // this request should be cached with a lifetime of 10 seconds

    if (getAllRows.ok) {
      const info = await getAllRows.json();
      const options = {
        next: { revalidate: 10 }, // this request is also cached with a lifetime of 10 seconds
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userId }), // Pass the PayPal invoice ID to the backend
      };

      const getUserPartners = await fetch('/api/db/fetch-user-partners', options,);
      let getUserPartnersRes = await getUserPartners.json();
      if (getUserPartners.ok) {
        let data: ColumnsPartnerDef = {
          "globalPartners": info?.data,
          "userPartners": getUserPartnersRes?.list,
        }
        return data;
      } else {
        throw new Error("Error fetching user specific partners.");
      };
    } else {
      throw new Error("Error fetching rows.");
    }
  } catch (error) {
    console.error("An error occurred while fetching from the DB:", error);
    let s = `An error occurred while fetching from the DB. ${error}`
    alert(s);
    throw error;
  }
}

export default function ExploreTable() {
  const [data, setData] = useState<any>([]);
  const { userId } = useAuth(); // get current logged in user ID

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      try {
        if (userId) {
          const newData = await fetchAllTableData(userId);
          setData(newData);
        }
      } catch (error) {
        console.error("An error occurred while fetching from the DB:", error);
        alert("An error occurred while fetching from the DB.");
      }
    }

    if (data.length === 0) { // Check if data is empty before fetching
      fetchDataAndUpdateState();
    }
  }, [data]); // Only re-run effect if data changes

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={ columns } data={ data?.globalPartners } />
    </div>
  );
}