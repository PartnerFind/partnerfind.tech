"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { SignInButton } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default function SharedListTable({ fetchAllPartners, userID }: { fetchAllPartners: any; userID: any }) {
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState<any[]>([]);

  if (userID !== null || !userID) {
    // Fetch and modify data when component mounts or user ID changes

    useEffect(() => {
      fetchAndModifyData(userID).then((modified) => setModifiedData(modified));
    }, [userID, fetchAllPartners, data]);
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-0 pt-20">
        <div className="w-full md:max-w-xl z-30">
          <div className="space-y-4 text-center">
            <div>
              <h1 className="text-lg font-medium">Sign in to check out this shared partner list! 📃</h1>
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

  // Function to fetch current user's favorites and modify if they match with the shared user's list
  const fetchAndModifyData = async (userID: string) => {
    try {
      const currentUserFavorites = await fetchAllPartners(userID);

      // Extract names from currentUserFavorites for fast lookup
      const favoriteNames = currentUserFavorites.list.data.map((favorite: any) => favorite.name);

      // Modify data based on existence of favorite names
      const modifiedData = data.map((item: any) => {
        if (favoriteNames.includes(item.name)) {
          // Update userID to current user's ID
          return {
            ...item,
            userID: userID,
          };
        } else {
          // Remove userID property if name is not a favorite
          const { userID, ...rest } = item;
          return rest;
        }
      });

      return modifiedData;
    } catch (error) {
      console.error("Error fetching and modifying data:", error);
      return data; // Return original data if an error occurs
    }
  };

  return (
    <div className="container px-4 pt-24 md:pl-20 md:pt-40">
      {/* Render DataTable with modifiedData */}
      <DataTable columns={columns} data={modifiedData} />
    </div>
  );
}
