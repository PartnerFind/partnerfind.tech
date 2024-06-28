import MyListTable from "./my-list-table";
import { fetchUserFavorites as backendFetchUserFavorites } from "@/util/fetchUserFavorites";
import { auth } from "@clerk/nextjs/server";
// import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "PartnerFind | My-List",
};

export default async function MyListPage() {
  // noStore();
  const { userId }: { userId: string | null } = auth(); // get clerk user ID

  async function fetchUserFavorites(userId: string) {
    "use server";
    try {
      const partners = await backendFetchUserFavorites(userId);
      return partners;
    } catch (error: any) {
      console.error("Error when getting all partners", error);
      throw error; // Rethrow the error after logging it
    }
  }
  return (
    <>
      <MyListTable fetchUserFavorites={fetchUserFavorites} userID={userId} />
    </>
  );
}
