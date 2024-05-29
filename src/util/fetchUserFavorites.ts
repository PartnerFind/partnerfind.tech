import { db } from "@/server/index";
import { sql as s } from "drizzle-orm";
import { elaborateCompanies, userFavorites } from "@/server/db/schema";

export default async function fetchUserFavorites(userID: string) {
  let userList = null;

  try {
    userList = await db
      .select()
      .from(userFavorites)
      .where(s`${userFavorites.userID} = ${userID}`);
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

  // Include only companies that match the userID (so return the companies the user has in their favorites)
  const updatedCompanies = {
    data: formattedCompanies
      .filter((company) => {
        const matchingUser = userList.find(
          (user) => user.name === company.name,
        );
        return matchingUser;
      })
      .map((company) => {
        const matchingUser = userList.find(
          (user) => user.name === company.name,
        );
        return { ...company, userID: matchingUser?.userID };
      }),
  };

  return { list: updatedCompanies }; // list.data to access
}
