"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { categories } from "./catagories-data"

// This type is used to define the shape of our data.
export type ColumnsPartnerDef = { // shadcn table might need to take in a single key object? idk
  data: {
    category: string;
    name: string;
    type: string;
    description: string;
    resources: string;
    phonenumber: string;
    email: string;
    userID?: string;
  }[],
}

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
      )
    },
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("category")
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
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
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
    accessorKey: "resources",
    header: "Resources",
  },
  {
    accessorKey: "phonenumber",
    header: "Phone Number",
    cell: ({ row }) => {
      let phonenumber: string = row.getValue("phonenumber"); // todo format
      if (!phonenumber) {
        return null;
      } else {
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      let email: string = row.getValue("email");
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
  // {
  //   accessorKey: "userPartners.add_partner_toggle", // todo: add checkboxes (for toggling) and use radix apis for flow
  //   header: "Add Partner to List", // make a cell here with the checkboxes ^^^
  //   cell: ({ row }) => {
  //     // let rowName = row.getValue("name"); // Get the name of the row

  //     // let initalChecked: boolean = false;
  //     // const [checked, setChecked] = useState(false);

  //     // const handleCheckboxChange = async () => {
  //     //   if (checked) {
  //     //     try {
  //     //       const response = await fetch(`/api/db/getClerkUserID`);
  //     //       if (response.ok) {
  //     //         const getUserID = await response.json();
  //     //         const userID = getUserID?.clerkUserID;
  //     //         console.log("UserID:", userID); // Log the userID
  //     //       } else {
  //     //         throw new Error("Error fetching user ID.");
  //     //       }
  //     //     } catch (error) {
  //     //       console.error("An error occurred while fetching the user ID:", error);
  //     //       alert("An error occurred while fetching the user ID");
  //     //       throw error;
  //     //     }
  //     //   }
  //     //   setChecked(!checked);
  //     // };
      
  //     // let add_partner_toggle: string = row.getValue("add_partner");

  //     return (
  //       // <Checkbox checked={ checked } onCheckedChange={ handleCheckboxChange } />
  //       <Checkbox />
  //     );
  //   },
  // },
]