"use client"

export default async function ExploreTable() {
  async function fetchAllRows() { // NextJS server action to fetch data from the backend
    'use server'
    try {
      const response = await fetch(`/api/db/fetch-all-rows`);
      if (response.ok) {
        let info = await response.json();
        info = info.data;
        return info;
      } else {
        alert("Error fetching rows.");
      }
    } catch (error) {
      alert("An error occurred while fetching from the DB.");
      console.error(error);
    }
  }

  let data = await fetchAllRows();
  return (
    <>
      <h1>hi</h1>
    </>
  );
}