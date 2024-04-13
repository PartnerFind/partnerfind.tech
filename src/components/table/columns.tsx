"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { categories } from "./catagories-data"

// This type is used to define the shape of our data.
export type ColumnsPartnerDef = { // shadcn table might need to take in a single key object? idk
  userID: string;
  data: {
    category: string;
    name: string;
    type: string;
    description: string;
    resources: string;
    phonenumber: string;
    email: string;
    userID?: string; // userID is optional
  }
}

export const columns: ColumnDef<ColumnsPartnerDef>[] = [
  {
    accessorKey: "data.category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("data.category")
      )

      if (!category) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{category.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "data.name", // todo: add Link to specific pages here
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] font-medium">
            {row.getValue("data.name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "data.type",
    header: "Type",
  },
  {
    accessorKey: "data.description",
    header: "Description",
    cell: ({ row }) => {
      let description: string = row.getValue("data.description");
      if (description.length > 200) {
        // If description is more than 200 characters, truncate and add an ellipise (...), but make sure to not slice on spaces
        let truncatedDescription = description.slice(0, 197); 
        let lastSpaceIndex = truncatedDescription.lastIndexOf(' ');
  
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
    accessorKey: "data.resources",
    header: "Resources",
  },
  {
    accessorKey: "data.phonenumber",
    header: "Phone Number",
    cell: ({ row }) => {
      let phonenumber: string = row.getValue("data.phonenumber");
      if (!phonenumber) {
        return null;
      } else {
        function formatPhoneNumber(phoneNumber: string) {
          // Remove any non-digit characters
          const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      
          // Format the phone number
          const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
      
          return formatted;
        }
      phonenumber = formatPhoneNumber(phonenumber);
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              { phonenumber }
            </span>
          </div>
        )
      }
    },
  },
  {
    accessorKey: "data.email",
    header: "Email",
    cell: ({ row }) => {
      let email: string = row.getValue("data.email");
      if (!email) {
        return null;
      } else {
        email = email.toLowerCase();

        return (
          <a className="font-medium" href={`mailto:${email}`} style={{ color: "#1a73e8", textDecoration: "underline" }}>
            {email}
          </a>
        );
      }
    },
  },
  {
    accessorKey: "data.userID",
    header: "In my List?",
    cell: ({ row }) => {
      const [checked, setChecked] = useState(false);

      useEffect(() => {
        // if the field is empty, null or does not exist, set the checkbox to false
        if (!row.getValue("data.userID") || row.getValue("data.userID") === "" || row.getValue("data.userID") === "null") {
          setChecked(false);
        } else { // if it exists, then set checkbox to true
          setChecked(true);
        }
      }, [row]);

      const handleCheckboxChange = async () => {
        

        if (!checked) {
          
          // try {
          // const options = {
          //   next: { revalidate: 0 }, // make sure its fresh every call
          //   method: 'POST',
          //   headers: {
          //       'Content-Type': 'application/json',
          //   }, 
          //   body: JSON.stringify({ data: { userID: row.getValue("data.userID"), name: row.getValue("data.name") } }), // Pass the user ID and name fields to the backend
          // };
          //   console.log(row.getValue("data.userID"), "userid");
          //   console.log(row.getValue("data.name"), "name")
          //   const addToList = await fetch(`/api/db/addToList`, options);
          //   if (addToList.ok) {
          //     setChecked(true);
          //   } else {
          //     throw new Error("Error adding user ID and name.");
          //   }
          // } catch (error) {
          //   throw new Error("An error occurred while adding user ID and name.");
          // }
          setChecked(true)
        } else if (checked) {
          try {
            const options = {
              next: { revalidate: 0 }, // make sure its fresh every call
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({ data: { userID: row.getValue("data.userID"), name: row.getValue("data.name") } }), // Pass the user ID and name fields to the backend
            };
            console.log(row.getValue("data.userID"), "userid");
            console.log(row.getValue("data.name"), "name")
            const removeFromList = await fetch(`/api/db/removeFromList`, options);
            if (removeFromList.ok) {
              setChecked(false);
            } else {
              throw new Error("Error removing user ID and name.");
            }
          } catch (error) {
            throw new Error("An error occurred while removing user ID and name.");
          }
        }
      };
      
      return (
        <Checkbox checked = { checked } onCheckedChange={ handleCheckboxChange }/>
      );
    },
  },
]