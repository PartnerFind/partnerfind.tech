import { db } from "@/server/index";
import { sql as s } from "drizzle-orm";
import { elaborateCompanies, userFavorites } from "@/server/db/schema";

export default async function fetchAllPartners(userID: string) {
  let userList = null;

  try {
    userList = await db
      .select()
      .from(userFavorites)
      .where(s`${userFavorites.userID} = ${userID}`);
  } catch (err: any) {
    console.error("Failed to query userFavorites:", err);
    // Return all companies with an empty userID field
    return handleNoFavorites();
  }

  let Companies = null;
  try {
    Companies = await db.select().from(elaborateCompanies);
  } catch (err: any) {
    console.error(err);
    throw new Error(`Failed to query elaborateCompanies | ${err.message}`);
  }

  // Remove genpage from company object
  const formattedCompanies = Companies.map((item) => {
    const { genpage, ...rest } = item;
    return rest;
  });

  // Add userID to company object if the userID matches with the company name in userFavorites db table
  const updatedCompanies = {
    data: formattedCompanies.map((company) => {
      const matchingUser = userList.find((user) => user.name === company.name);
      return matchingUser ? { ...company, userID: matchingUser.userID } : company;
    }),
  };

  return { list: updatedCompanies };
}

// Helper function to handle the case where the user has no favorites
const handleNoFavorites = async () => {
  let Companies = null;
  try {
    Companies = await db.select().from(elaborateCompanies);
  } catch (err: any) {
    console.error(err);
    throw new Error(`Failed to query elaborateCompanies | ${err.message}`);
  }

  // Remove genpage from company object
  const formattedCompanies = Companies.map((item) => {
    const { genpage, ...rest } = item;
    return rest;
  });

  // Add an empty userID field to all companies
  const updatedCompanies = {
    data: formattedCompanies.map((company) => ({ ...company, userID: "" })),
  };

  return { list: updatedCompanies };
};
