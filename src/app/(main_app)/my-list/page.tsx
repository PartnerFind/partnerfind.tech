import MyListTable from './my-list-table';
import { auth } from '@clerk/nextjs';

export const metadata = {
    title: "PartnerFind | My-List"
};

async function fetchAllTableData(userId: string) { // fetch all the partners as well as user specific partners list
    try {
        const options = {
            next: { revalidate: 0 },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ userID: userId }), // Pass the user ID to the backend
        };

        const getAllRows = await fetch('https://partnerfind.tech/api/db/fetch-list-rows-user', options); // TODO
        if (getAllRows.ok) {
            const data = await getAllRows.json();
            return data
        } else {
            throw new Error("Error fetching rows from DB.");
        }
    } catch (error) {
        console.error("An error occurred while fetching from the DB:", error);
        throw new Error("An error occurred while fetching from the DB:");
    }
}

export default async function MyListPage() {
    let data: string | null = null;
    const { userId } : { userId: string | null } = auth();
    
    if (userId !== null) {
        data = await fetchAllTableData(userId);
    }
    
    return (
        <>
            <MyListTable data={data || ''} />
        </>
    );
}