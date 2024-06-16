import { db } from "@/server/index";
import { sql as s } from "drizzle-orm";
import { elaborateCompanies, userFavorites } from "@/server/db/schema";

export default async function fetchAllPartners(userID: string) {
  let userList = null; // keep global variable to edit later

  try {
    userList = await db
      .select()
      .from(userFavorites)
      .where(s`${userFavorites.userID} = ${userID}`); // query db for userFavorites based on passed in userID
  } catch (err: any) {
    console.error(err);
    throw new Error(`Failed to query userFavorites | ${err.message}`);
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
      return matchingUser ? { ...company, userID: matchingUser.userID } : company; // this added user ID field to the final data is used in the table to
      // determine if the user has favorited the company or not by just checking if it exists in the data passed to the table
    }),
  };

  return { list: updatedCompanies }; // list.data to access
}
