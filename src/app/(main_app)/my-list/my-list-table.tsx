"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default function ExploreTable({ fetchAllPartners, userID }: { fetchAllPartners: any; userID: any }) {
  const [data, setData] = useState([]);

  if (userID !== null || !userID) {
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchAllPartners(userID); // fetch all the partners as well as user specific partners list to pass into table
        setData(result.list.data || "");
      };

      fetchData();
    }, [fetchAllPartners, userID]);

    if (data === null || data) {
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites!</h1>
      </div>;
    }

    return (
      <div className="container px-4 pt-24 md:pl-20 md:pt-40">
        {/* we use the same DataTable component for this table as well (since all the data sent to the table is the same format) */}
        <DataTable columns={columns} data={data} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites! Please Sign-In</h1>
      </div>
    );
  }
}
