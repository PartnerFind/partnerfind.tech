import ExploreTable from './explore-table';

export const metadata = {
    title: "PartnerFind | Explore"
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

        const getAllRows = await fetch('http://localhost:3000/api/db/fetch-all-rows-with-user', options); // TODO
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

export default async function ExplorePage() {
    const userId = 'user_2e1CYrk8OQu5f2qAiW58hmE35ev';
    const data = await fetchAllTableData(userId);
    return (
        <>
            <ExploreTable data={ data } />
        </>
    );
}