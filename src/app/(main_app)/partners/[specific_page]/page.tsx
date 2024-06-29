import { notFound } from "next/navigation";
import SpecificPartnerComponent from "./specific-partner";
import fetchRAGDataForAPartner from "@/util/fetchRAGDataForAPartner";

export async function generateMetadata({ params }: any) {
  const specific_page = decodeURIComponent(params.specific_page);
  const title = `${specific_page} | PartnerFind`;
  return {
    title: title,
  };
}

async function fetchWithRetry(name: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchRAGDataForAPartner(name);
      if (data) return data;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 0.5 second before retrying
    }
  }
  return null;
}

export default async function SpecificPartnerPage({ params }: { params: any }) {
  let name = decodeURIComponent(params.specific_page);
  let data = await fetchWithRetry(name);

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
