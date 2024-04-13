'use client'

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";

export default function ExploreTable({ data }: { data: any }) {
  // console.log(data.data)

  return (
    <div className="container mx-auto py-10">
      {/* <h1>{data?.data.data[0].name}</h1> */}
      <DataTable columns={ columns } data={ data.data } />
    </div>
  );
}