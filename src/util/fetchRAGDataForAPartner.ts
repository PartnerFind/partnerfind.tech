import { db } from "@/server/index";
import { elaborateCompanies } from "@/server/db/schema";

export default async function fetchRAGDataForAPartner(name: string) {
  try {
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

    const findName = allData.find((item) => item.name === name);

    if (!findName) {
      console.log(`No data found for partner: ${name}`);
      return null;
    }

    return { ragData: findName };
  } catch (error) {
    console.error(`Error fetching data for partner ${name}:`, error);
    return null;
  }
}
