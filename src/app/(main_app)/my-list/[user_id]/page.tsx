import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import fetchUserFavorites from "@/util/fetchUserFavorites";
import SharedListTable from "./shared-list-table";
import { unstable_noStore as noStore } from 'next/cache';

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
  noStore();
  let user_id = decodeURIComponent(params.user_id);
  let allFavorites: any = null;

  if (user_id !== null) {
    allFavorites = await fetchUserFavorites(user_id); // fetch all the partners user has favorited
  } else {
    notFound();
  }

  async function getCurrentUserFavorites(currentUserID: string) {
    "use server";

    try {
      const favorites = await fetchUserFavorites(currentUserID);
      return favorites;
    } catch (error: any) {
      console.error("Error when getting current user's favorites", error);
      throw error; // Rethrow the error after logging it
    }
  }

  return (
    <>
      <SharedListTable data={allFavorites.list.data || ""} getCurrentUserFavorites={getCurrentUserFavorites} />
      {/* will show a nice "No Results Found" table if no data */}
    </>
  );
}
