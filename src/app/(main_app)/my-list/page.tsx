import MyListTable from "./my-list-table";
import fetchUserFavorites from "@/util/fetchUserFavorites";
import { auth } from "@clerk/nextjs/server";

const dynamic = "force-dynamic";

export const metadata = {
  title: "PartnerFind | My-List",
};

export default async function MyListPage() {
  const { userId }: { userId: string | null } = auth(); // get clerk user ID
  let allFavorites: any = null;

  if (userId !== null) {
    allFavorites = await fetchUserFavorites(userId); // fetch all the partners user has favorited
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
        <MyListTable data={allFavorites.list.data || ""} />
      </>
    );
  }
}
