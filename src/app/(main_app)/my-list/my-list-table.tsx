"use client";

import { useState, useEffect } from "react";
import { unstable_noStore as noStore } from 'next/cache';
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { Button } from "@/components/ui/button";
import TweakedLoadingSpinner from "@/components/tweaked-loading-spinner";

export default function MyListTable({
  fetchUserFavorites,
  fetchRAGDataForAPartner,
  userID,
}: {
  fetchUserFavorites: any;
  fetchRAGDataForAPartner: any;
  userID: any;
}) {
  noStore();
  const [data, setData] = useState<any[]>([]);
  const [exportData, setExportData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        setIsLoading(true);
        try {
          const result = await fetchUserFavorites(userID);
          setData(result.list.data || []);
        } catch (error) {
          console.error("Error fetching favorites:", error);
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
  }, [fetchUserFavorites, userID]);

  useEffect(() => {
    const fetchExportData = async () => {
      const exportDataTemp: any = {};
      for (const item of data) {
        if (item?.name) {
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

  const handleJSONExport = () => {
    const exportDataJSON = JSON.stringify(exportData, null, 2);
    const blob = new Blob([exportDataJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `my_list_partnerfind.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!userID) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites. Please Sign In!</h1>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-24 md:pl-20 md:pt-40">
      {isLoading ? (
        <TweakedLoadingSpinner/>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">No Favorites!</h1>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={data}/>
          <Button variant="outline" onClick={handleJSONExport}>
            Export This Data to JSON!
          </Button>
        </>
      )}
    </div>
  );
}
