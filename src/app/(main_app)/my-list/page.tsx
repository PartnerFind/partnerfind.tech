import MyListTable from './my-list-table';
import fetchUserFavorites from '@/util/fetchUserFavorites';
import { auth } from '@clerk/nextjs';

export const metadata = {
    title: "PartnerFind | My-List"
};

export default async function MyListPage() {
    const { userId } : { userId: string | null } = auth(); // get clerk user ID
    let allFavorites: any = null;
    
    if (userId !== null) {
        allFavorites = await fetchUserFavorites(userId); // fetch all the partners user has favorited
    }
    
    return (
        <>
            <MyListTable data={ allFavorites.list.data || '' } />
        </>
    );
}