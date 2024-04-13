'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default function ExploreTable({ data }: { data: any }) {

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={ columns } data={ data.data.data } />
    </div>
  );
}