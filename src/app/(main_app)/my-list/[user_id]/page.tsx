import { notFound } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { fetchUserFavorites as backendFetchUserFavorites } from "@/util/fetchUserFavorites";
import SharedListTable from "./shared-list-table";
import { ShareListCopyButton } from "@/components/ui/share-list-copy-button";
import { headers } from "next/headers";
import { fetchRAGDataForAPartner as backendFetchRAGDataForAPartner } from "@/util/fetchRAGDataForAPartner";

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
  const { userId } = auth(); // get current user ID

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

  async function fetchRAGDataForAPartner(partnerName: string) {
    "use server";

    try {
      const ragData = await backendFetchRAGDataForAPartner(partnerName);
      return ragData;
    } catch (error: any) {
      console.error("Error when getting RAG data for a partner", error);
      throw error; // Rethrow the error after logging it
    }
  }

  if (user_id === null || !user_id) {
    notFound();
  }

  // Get the host dynamically
  const headersList = headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Construct the full URL
  const fullUrl = `${protocol}://${host}/my-list/${user_id}`; // use the params user id

  return (
    <div className="space-y-4">
      {/* will show a nice "No Results Found" table if no data */}
      <SharedListTable fetchUserFavorites={fetchUserFavorites} fetchRAGDataForAPartner={fetchRAGDataForAPartner} userID={user_id} currentUserID={userId} />

      <div className="flex justify-end">
        <ShareListCopyButton value={fullUrl} />
      </div>
    </div>
  );
}
