"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "./catagories-data";
import { useToast } from "@/components/ui/use-toast";

// This type is used to define the shape of our data.
export type ColumnsPartnerDef = {
  // shadcn table might need to take in a single key object? idk
  // userID: string;
  data: {
    category: string;
    name: string;
    type: string;
    description: string;
    resources: string;
    phonenumber: string;
    email: string;
    userID?: string; // userID is optional
  };
};

export const columns: ColumnDef<ColumnsPartnerDef>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("category"),
      );

      if (!category) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{category.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let name: string = row.getValue("name");
      if (!name) {
        return null;
      } else {
        return (
          <div className="flex space-x-4">
            <span className="max-w-[275px] font-medium">
              <a
                className="font-medium"
                href={`/partners/${name}`}
                style={{ color: "#1a73e8", textDecoration: "underline" }}
              >
                {name}
              </a>
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      let description: string = row.getValue("description");
      if (description.length > 200) {
        // If description is more than 200 characters, truncate and add an ellipise (...), but make sure to not slice on spaces
        let truncatedDescription = description.slice(0, 197);
        let lastSpaceIndex = truncatedDescription.lastIndexOf(" ");

        if (lastSpaceIndex !== -1) {
          // If a space was found before the 197th character, truncate at that space
          return truncatedDescription.slice(0, lastSpaceIndex) + "...";
        } else {
          // If no space was found, truncate at the 197th character
          return truncatedDescription + "...";
        }
      } else {
        // Return the full description if it is less than or equal to 200 characters
        return description;
      }
    },
  },
  {
    accessorKey: "resources",
    header: "Resources",
  },
  {
    accessorKey: "phonenumber",
    header: "Phone Number",
    cell: ({ row }) => {
      let phonenumber: string = row.getValue("phonenumber");
      if (!phonenumber) {
        return "Not Available";
      } else {
        function formatPhoneNumber(phoneNumber: string) {
          // Remove any non-digit characters
          const cleaned = ("" + phoneNumber).replace(/\D/g, "");

          // Format the phone number
          const formatted = cleaned.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "($1)-$2-$3",
          );

          return formatted;
        }
        phonenumber = formatPhoneNumber(phonenumber);
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {phonenumber}
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      let email: string = row.getValue("email");
      if (!email) {
        return "Not Available";
      } else {
        email = email.toLowerCase();

        return (
          <a
            className="font-medium"
            href={`mailto:${email}`}
            style={{ color: "#1a73e8", textDecoration: "underline" }}
          >
            {email}
          </a>
        );
      }
    },
  },
  {
    accessorKey: "userID",
    header: `In my List?`, // todo increase width
    size: 500,
    cell: ({ row }) => {
      const { toast } = useToast();
      const [checked, setChecked] = useState(false);
      const [loading, setLoading] = useState(true); // loading state

      useEffect(() => {
        // if the field is empty, null or does not exist, set the checkbox to false
        if (
          !row.getValue("userID") ||
          row.getValue("userID") === "" ||
          row.getValue("userID") === "null"
        ) {
          setChecked(false);
        } else {
          // if it exists, then set checkbox to true
          setChecked(true);
        }
        setLoading(false); // Set loading to false after checking the row value
      }, [row]);

      const handleCheckboxChange = async () => {
        let clerkUserID = null;

        try {
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const getClerkUserID = await fetch(`/api/getClerkUserID`, options);
          let getClerkUserIDResponse = await getClerkUserID.json();
          clerkUserID = getClerkUserIDResponse?.userID;
        } catch (error) {
          throw new Error("An error occurred while querying userID.");
        }

        if (!checked) {
          // user wants to add to their list
          try {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: { userID: clerkUserID, name: row.getValue("name") },
              }), // Pass the user ID and name fields to the backend
            };

            const addToList = await fetch(`/api/db/addToList`, options);
            if (addToList.ok) {
              setChecked(true);
              toast({
                title: `Added to your list! 🎉`,
                description: (
                  <>
                    <div>
                      <h1 className="mt-2 w-[340px] rounded-md p-4 text-green-500">
                        Successfully added to your list!
                      </h1>
                    </div>
                  </>
                ),
              });
            } else {
              throw new Error("Error adding user ID and name.");
            }
          } catch (error) {
            throw new Error("An error occurred while adding user ID and name.");
          }
        } else if (checked) {
          // user wants to remove from their list (userID already exists in data for these)
          try {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: { userID: clerkUserID, name: row.getValue("name") },
              }), // Pass the user ID and name fields to the backend
            };

            const removeFromList = await fetch(
              `/api/db/removeFromList`,
              options,
            );
            if (removeFromList.ok) {
              setChecked(false);
              toast({
                title: `Removed from your list ❌!`,
                variant: "destructive",
                description: (
                  <>
                    <div>
                      <h1 className="mt-2 w-[340px] rounded-md p-4 text-white">
                        Successfully removed from your list!
                      </h1>
                    </div>
                  </>
                ),
              });
            } else {
              throw new Error("Error removing user ID and name.");
            }
          } catch (error) {
            throw new Error(
              "An error occurred while removing user ID and name.",
            );
          }
        }
      };

      return (
        <div className="flex items-center">
          {/* Conditional rendering of skeleton or checkbox based on loading state */}
          {loading ? (
            <Skeleton className="h-3.5 w-3.5 rounded-sm border" />
          ) : (
            <Checkbox
              className="h-3.5 w-3.5"
              checked={checked}
              onCheckedChange={handleCheckboxChange}
            />
          )}
        </div>
      );
    },
  },
];
