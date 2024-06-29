import { db } from "@/server/index";
import { elaborateCompanies } from "@/server/db/schema";

export async function fetchRAGDataForAPartner(name: string) {
  // Full data for the elaborateCompanies table, using this table you can create objects for each individual row (aka Bombay Bazar for example)
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

  // Object for the Company
  const findName = allData.find((item) => item.name === name);

  return { ragData: findName };
}
