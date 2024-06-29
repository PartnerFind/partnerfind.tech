"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { Button } from "@/components/ui/button";

export default function ExploreTable({
  fetchUserFavorites,
  fetchRAGDataForAPartner,
  userID,
}: {
  fetchUserFavorites: any;
  fetchRAGDataForAPartner: any;
  userID: any;
}) {
  const [data, setData] = useState<any[]>([]);
  const [exportData, setExportData] = useState<any>({});

  if (userID !== null || !userID) {
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchUserFavorites(userID); // fetch all the partners as well as user specific partners list to pass into table
        setData(result.list.data || []);
      };

      fetchData();
    }, [fetchUserFavorites, userID]);

    useEffect(() => {
      const fetchExportData = async () => {
        const exportDataTemp: any = {};
        for (const item of data) {
          if (item && item.name) {
            const ragData = await fetchRAGDataForAPartner(item.name);
            exportDataTemp[item.name] = ragData;
          }
        }
        setExportData(exportDataTemp);
      };

      if (data.length > 0) {
        fetchExportData();
      }
    }, [data, fetchRAGDataForAPartner]);

    if (data === null || data.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">No Favorites!</h1>
        </div>
      );
    }

    const handleJSONExport = () => {
      const exportDataJSON = JSON.stringify(exportData, null, 2); // format nicely
      const blob = new Blob([exportDataJSON], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `my_list_partnerfind.json`;
      link.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="container px-4 pt-24 md:pl-20 md:pt-40">
        {/* we use the same DataTable component for this table as well (since all the data sent to the table is the same format) */}
        <DataTable columns={columns} data={data} />
        <Button variant="outline" onClick={handleJSONExport}>
          Export This Data to JSON!
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites Please Sign-In</h1>
      </div>
    );
  }
}
