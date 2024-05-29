import ExploreTable from "./explore-table";
import fetchAllPartners from "@/util/fetchAllPartners";
import { auth } from "@clerk/nextjs";

export const metadata = {
  title: "PartnerFind | Explore",
};

export default async function ExplorePage() {
  const { userId }: { userId: string | null } = auth(); // get clerk user ID
  let allFavorites: any = null;

  if (userId !== null) {
    allFavorites = await fetchAllPartners(userId); // fetch all the partners as well as user specific partners list to pass into table
  }

  return (
    <>
      <ExploreTable data={allFavorites.list.data || ""} />
    </>
  );
}
