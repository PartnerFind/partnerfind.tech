"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import TweakedLoadingSpinner from "@/components/tweaked-loading-spinner";

export default function ExploreTable({ fetchAllPartners, userID }: { fetchAllPartners: any; userID: any }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userID !== null && userID !== undefined) {
        setIsLoading(true);
        try {
          const result = await fetchAllPartners(userID);
          setData(result.list.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setData([]);
      }
    };

    fetchData();
  }, [fetchAllPartners, userID]);

  if (userID === null || userID === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Cannot View Partner Directory. Please Sign In!</h1>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-24 md:pl-20 md:pt-40">
      {isLoading ? (
        <TweakedLoadingSpinner />
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">No Partners Found</h1>
        </div>
      ) : (
        <DataTable columns={columns} data={data}/>
      )}
    </div>
  );
}
