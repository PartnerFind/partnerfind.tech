import { notFound } from "next/navigation";
import { clerkClient, auth } from "@clerk/nextjs/server";
import {fetchAllPartners as backendFetchAllPartners} from "@/util/fetchAllPartners";
import SharedListTable from "./shared-list-table";
// import { unstable_noStore as noStore } from 'next/cache';

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
  // noStore();

  const { userId }: { userId: string | null } = auth(); // get clerk user ID
  let user_id = decodeURIComponent(params.user_id);

  async function fetchAllPartners(userId: string) {
    "use server";
    try {
      const partners = await backendFetchAllPartners(userId);
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
      <SharedListTable fetchAllPartners={fetchAllPartners} userID={userId}/>
      {/* will show a nice "No Results Found" table if no data */}
    </>
  );
}
