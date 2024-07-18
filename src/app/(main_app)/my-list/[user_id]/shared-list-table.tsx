"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { SignInButton } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import TweakedLoadingSpinner from "@/components/tweaked-loading-spinner";

export default function SharedListTable({
  fetchUserFavorites,
  userID,
  currentUserID,
}: {
  fetchUserFavorites: any;
  userID: any;
  currentUserID: any;
}) {
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndModify = async () => {
      if (userID) {
        setIsLoading(true);
        try {
          const sharedData = await fetchUserFavorites(userID);
          const data = sharedData.list.data;
          setData(data);

          if (currentUserID) {
            const favoriteNames = data.map((favorite: any) => favorite.name);
            const modifiedData = data.map((item: any) => {
              if (favoriteNames.includes(item.name)) {
                return {
                  ...item,
                  userID: currentUserID,
                };
              } else {
                const { userID, ...rest } = item;
                return rest;
              }
            });
            setModifiedData(modifiedData);
          } else {
            setModifiedData([]);
          }
        } catch (error) {
          console.error("Error fetching shared data:", error);
          setData([]);
          setModifiedData([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setData([]);
        setModifiedData([]);
      }
    };

    fetchDataAndModify();
  }, [fetchUserFavorites, userID, currentUserID]);

  const handleJSONExport = () => {
    const categoryMapping: any = {
      FPO: "For-Profit (FPO)",
      NPO: "Non-Profit (NPO)",
      GA: "Government Association (GA)",
      LB: "Local Business (LB)",
      CB: "Corporate Business (CB)",
    };

    const updatedData = modifiedData.map((item: any) => ({
      category: categoryMapping[item.category],
      name: item.name,
      type: item.type,
      description: item.description,
      resources: item.resources,
      phonenumber: item.phonenumber,
      email: item.email,
      summary: item.genpage?.summary,
      reasons: item.genpage?.reasons,
      flaws: item.genpage?.flaws,
      process: item.genpage?.process,
      sources: item.sources,
    }));

    const exportDataJSON = JSON.stringify(updatedData, null, 2);
    const blob = new Blob([exportDataJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `shared_list_partnerfind.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!userID) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-0 pt-20">
        <div className="w-full md:max-w-xl z-30">
          <div className="space-y-4 text-center">
            <div>
              <h1 className="text-lg font-medium">Sign in to check out this shared partner list!</h1>
              <h2 className="text-sm text-gray-500 pt-1">
                You are not signed in. Please sign in to view this shared partner list.
              </h2>
            </div>
            <Separator />
            <div className="w-full mt-4">
              <SignInButton>
                <Button className="font-bold py-1 px-4 rounded-lg w-full md:w-auto">Sign In</Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-24 md:pl-20 md:pt-40">
      {isLoading ? (
        <TweakedLoadingSpinner />
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">No shared data found.</h1>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={modifiedData} />
          <Button variant="outline" onClick={handleJSONExport}>
            Export This Data to JSON!
          </Button>
        </>
      )}
    </div>
  );
}
