"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type Partner = {
  category: string
  name: string
  type: string
  description: string
  resources: string
  phonenumber: string
  email: string
  genpage: {
    summary: string
    resources: string
    reasons: string
    flaws: string
    process: string
  }
  add_partner: boolean
}

export const columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "resources",
    header: "Resources",
  },
  {
    accessorKey: "phonenumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "add_partner", // todo
    header: "Add Partner to List",
  },
]
