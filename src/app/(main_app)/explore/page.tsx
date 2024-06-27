import ExploreTable from "./explore-table";
import fetchAllPartners from "@/util/fetchAllPartners";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PartnerFind | Explore",
};

export default async function ExplorePage() {
  const { userId }: { userId: string | null } = auth(); // get clerk user ID
  let allFavorites: any = null;

  if (userId !== null) {
    allFavorites = await fetchAllPartners(userId); // fetch all the partners as well as user specific partners list to pass into table
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites!</h1>
      </div>
    );
  }

  if (allFavorites === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Favorites!</h1>
      </div>
    );
  } else {
    return (
      <>
        <ExploreTable data={allFavorites.list.data || ""} />
      </>
    );
  }
}
