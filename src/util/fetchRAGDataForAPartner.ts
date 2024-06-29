import { db } from "@/server/index";
import { elaborateCompanies } from "@/server/db/schema";

export default async function fetchRAGDataForAPartner(name: string) {
  try {
    // Fetch all data from the elaborateCompanies table
    const allData = await db
      .select({
        category: elaborateCompanies.category,
        name: elaborateCompanies.name,
        type: elaborateCompanies.type,
        description: elaborateCompanies.description,
        resources: elaborateCompanies.resources,
        phonenumber: elaborateCompanies.phonenumber,
        email: elaborateCompanies.email,
        genpage: elaborateCompanies.genpage as any,
        sources: elaborateCompanies.sources as any,
      })
      .from(elaborateCompanies)
      .execute();

    // Find the specific company by name
    const findName = allData.find((item) => item.name === name);

    // Check if the company data is found
    if (!findName) {
      console.error("Company not found:", name);
      return null;
    }

    return { ragData: findName || null };
  } catch (error) {
    console.error("Error in fetchRAGDataForAPartner:", error);
    return { ragData: null };
  }
}
