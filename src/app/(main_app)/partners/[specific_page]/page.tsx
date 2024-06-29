import { notFound } from "next/navigation";
import SpecificPartnerComponent from "./specific-partner";
import fetchRAGDataForAPartner from "@/util/fetchRAGDataForAPartner";

export async function generateMetadata({ params }: any) {
  // read route params
  const specific_page = decodeURIComponent(params.specific_page);
  // set the title based on the id
  const title = `${specific_page} | PartnerFind`;
  return {
    title: title,
  };
}

export default async function SpecificPartnerPage({ params }: { params: any }) {
  let name = decodeURIComponent(params.specific_page);
  let data = await fetchRAGDataForAPartner(name);

  if (data === null) {
    notFound();
  } else {
    return (
      <>
        <SpecificPartnerComponent data={data} />
      </>
    );
  }
}
