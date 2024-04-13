import { notFound } from "next/navigation";
import SpecificPartnerComponent from "./specific-partner";

export async function generateMetadata( { params }: any ) {
    // read route params
    const specific_page = params.specific_page
  
    // set the title based on the id
    const title = `PartnerFind | ${specific_page}`
  
    return {
      title: title,
    }
}

async function fetchRagDataFromDB(name: string) {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        }
        const fetchRagData = await fetch(`/api/db/fetchRagData`, options);
        const fetchRagDataRes = await fetchRagData.json();

        return fetchRagDataRes;
    } catch (error) {
        console.error("An error occurred while fetching RAG data from the database.")
        return null;
    }
}

export default async function SpecificPartnerPage( { params }: { params: any } ) {
    let name = decodeURIComponent(params.specific_page);
    console.log(name)
    let data = await fetchRagDataFromDB(name);

    if (data === null) {
        notFound()
    }
    else {
        return (
            <>
               <SpecificPartnerComponent data={ data } />
            </>
        );
    }
}