'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useState, useEffect } from "react";

async function fetchData() {
  try {
    const response = await fetch(`/api/db/fetch-all-rows`);
    if (response.ok) {
      const info = await response.json();
      return info?.data;
    } else {
      throw new Error("Error fetching rows.");
    }
  } catch (error) {
    console.error("An error occurred while fetching from the DB:", error);
    alert("An error occurred while fetching from the DB.");
    throw error; // Rethrow the error to propagate it further
  }
}

export default function ExploreTable() {
  const [data, setData] = useState([]);

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