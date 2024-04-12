'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useState, useEffect } from "react";

export type FetchResponseDef = {
  data: {
    category: string
    name: string
    type: string
    description: string
    resources: string
    phonenumber: string
    email: string
    genpage: {
      summary: string
      resources: string
      reasons: string
      flaws: string
      process: string
    }
  }[];
}

async function fetchData(): Promise<any[]> {
  try {
    const response = await fetch(`/api/db/fetch-all-rows`);
    if (response.ok) {
      const info: FetchResponseDef = await response.json();
      return info?.data ?? [];
    } else {
      throw new Error("Error fetching rows.");
    }
  } catch (error) {
    console.error("An error occurred while fetching from the DB:", error);
    alert("An error occurred while fetching from the DB.");
    throw error;
  }
}

export default function ExploreTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      try {
        const newData = await fetchData();
        setData(newData);
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
      <DataTable columns={ columns } data={ data } />
    </div>
  );
}