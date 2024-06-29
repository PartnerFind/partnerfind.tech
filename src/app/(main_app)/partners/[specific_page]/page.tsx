import { Suspense } from "react";
import Loading3Dots from "@/components/Loading3Dots"; // Create this component
import { fetchRAGDataForAPartner } from "@/util/fetchRAGDataForAPartner";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';
import SpecificPartnerComponent from "./specific-partner";

export default async function SpecificPartnerPage({ params }: { params: any }) {
  let name = decodeURIComponent(params.specific_page);

  return (
    <Suspense fallback={<Loading3Dots />}>
      <SpecificPartnerContent name={name} />
    </Suspense>
  );
}

async function SpecificPartnerContent({ name }: { name: string }) {
  noStore();
  let data = await fetchRAGDataForAPartner(name);
  if (data.ragData === undefined) {
    data = await fetchRAGDataForAPartner(name);
  }

  if (data === null) {
    notFound();
  } else {
    return <SpecificPartnerComponent data={data} />;
  }
}
