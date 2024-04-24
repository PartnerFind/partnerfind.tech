'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default function MyListTable({ data }: { data: any }) {

  return (
    <div className="container pl-60 pt-40">
      {/* we use the same DataTable component for this table as well (since all the data sent to the table is the same format) */}
      <DataTable columns={ columns } data={ data } /> 
    </div>
  );
}