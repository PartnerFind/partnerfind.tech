'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default function ExploreTable({ data }: { data: any }) {

  return (
    <div className="container pl-60 pt-40">
      <DataTable columns={ columns } data={ data } />
    </div>
  );
}