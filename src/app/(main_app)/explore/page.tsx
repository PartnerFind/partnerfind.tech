import ExploreTable from "./explore-table";
import { fetchAllPartners as backendFetchAllPartners } from "@/util/fetchAllPartners";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PartnerFind | Explore",
};

export default async function ExplorePage() {
  const { userId }: { userId: string | null } = auth(); // get clerk user ID

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

  return <ExploreTable fetchAllPartners={fetchAllPartners} userID={userId} />;
}
