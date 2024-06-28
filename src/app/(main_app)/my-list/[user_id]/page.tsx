import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { fetchUserFavorites as backendFetchUserFavorites } from "@/util/fetchUserFavorites";
import SharedListTable from "./shared-list-table";

export async function generateMetadata({ params }: any) {
  // read route params
  const user_id = decodeURIComponent(params.user_id);
  const userObject = await clerkClient.users.getUser(user_id);
  let titleData = null;

  if (userObject) {
    titleData = `${userObject.firstName}'s Shared Partner List`;
  } else {
    titleData = "Shared Partner List";
  }

  // set the title based on the user's first name
  const title = `${titleData} | PartnerFind`;
  return {
    title: title,
  };
}

export default async function SharedListPage({ params }: { params: any }) {
  let user_id = decodeURIComponent(params.user_id);

  async function fetchUserFavorites(userID: string) {
    "use server";
    try {
      const partners = await backendFetchUserFavorites(userID);
      return partners;
    } catch (error: any) {
      console.error("Error when getting all partners", error);
      throw error; // Rethrow the error after logging it
    }
  }

  if (user_id === null || !user_id) {
    notFound();
  }

  return (
    <>
      <SharedListTable fetchUserFavorites={fetchUserFavorites} userID={user_id} />
      {/* will show a nice "No Results Found" table if no data */}
    </>
  );
}
