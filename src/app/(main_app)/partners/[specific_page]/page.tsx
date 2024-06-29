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

  try {
    let data = await fetchRAGDataForAPartner(name);
    console.log(data);
    if (!data?.ragData) {
      console.error("No data found for:", name);
      notFound();
    } else {
      return (
        <>
          <SpecificPartnerComponent data={data.ragData} />
        </>
      );
    }
  } catch (error) {
    console.error("Error fetching partner data:", error);
    notFound();
  }
}
