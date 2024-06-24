"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { CircleProgress } from "@/components/ui/progress";
import ExcelJS from "exceljs";
import Loading3Dots from "@/components/Loading3Dots";

function formatPhoneNumber(phoneNumber: any) {
  // Remove any non-digit characters
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  // Format the phone number
  const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
  return formatted;
}

export default function SpecificPartnerComponent({ data }: { data: any }) {
  const { user, isLoaded } = useUser();
  const [clerkUserID, setClerkUserID] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // loading state
  const { toast } = useToast();

  useEffect(() => {
    if (user && isLoaded) {
      // Set the clerkUserID only when user and isLoaded are available
      setClerkUserID(user.id);
    }
  }, [user, isLoaded]);

  useEffect(() => {
    const fetchCurrentNoteandCurrentList = async () => {
      try {
        if (!clerkUserID) return; // Exit early if clerkUserID is null
        // Get current note
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: clerkUserID,
            name: data.ragData.name,
          }), // Pass the user ID to the backend
        };

        const getCurrentNote = await fetch("/api/db/getCurrentNote", options); // TODO
        if (getCurrentNote.ok) {
          const getCurrentNoteRes = await getCurrentNote.json();
          setNote(getCurrentNoteRes.data?.note);
        } else {
          throw new Error("Error fetching rows from DB.");
        }

        const getCheckboxStatus = await fetch("/api/db/getCurrentList", options);
        if (getCheckboxStatus.ok) {
          const getCheckboxStatusResponse = await getCheckboxStatus.json();
          setChecked(getCheckboxStatusResponse.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., set an error state
      }
    };

    fetchCurrentNoteandCurrentList();
  }, [clerkUserID, data]);

  if (loading) {
    return <Loading3Dots />;
  }

  const handleEditClick = () => {
    setEditMode(true);
    setNewNote(note || "");
  };

  const handleSaveClick = async () => {
    try {
      // Save the new note to the database
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: clerkUserID,
          name: data.ragData.name,
          note: newNote,
        }), // Pass the user ID, partner name, and new note to the backend
      };

      const saveNoteResponse = await fetch("/api/db/saveNote", options);
      if (!saveNoteResponse.ok) {
        throw new Error("Error saving note to DB.");
      }

      // Update the current note with the new note
      setNote(newNote);
      setEditMode(false);
    } catch (error) {
      console.error(error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  // Move the null checks outside of the hooks
  if (!user || !isLoaded) {
    // Handle loading state however you like
    return null;
  }

  const handleCheckboxChange = async () => {
    if (!checked) {
      // user wants to add to their list
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { userID: clerkUserID, name: data.ragData.name },
          }), // Pass the user ID and name fields to the backend
        };

        const addToList = await fetch(`/api/db/addToList`, options);
        if (addToList.ok) {
          setChecked(true);
          toast({
            title: `Added to your list! 🎉`,
            description: (
              <>
                <div>
                  <h1 className="mt-2 w-[340px] rounded-md p-4 text-green-500">Successfully added to your list!</h1>
                </div>
              </>
            ),
          });
        } else {
          throw new Error("Error adding user ID and name.");
        }
      } catch (error) {
        throw new Error("An error occurred while adding user ID and name.");
      }
    } else if (checked) {
      // user wants to remove from their list (userID already exists in data for these)

      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { userID: clerkUserID, name: data.ragData.name },
          }), // Pass the user ID and name fields to the backend
        };

        const removeFromList = await fetch(`/api/db/removeFromList`, options);
        if (removeFromList.ok) {
          setChecked(false);
          toast({
            title: `Removed from your list ❌!`,
            variant: "destructive",
            description: (
              <>
                <div>
                  <h1 className="mt-2 w-[340px] rounded-md p-4 text-white">Successfully removed from your list!</h1>
                </div>
              </>
            ),
          });
        } else {
          throw new Error("Error removing user ID and name.");
        }
      } catch (error) {
        throw new Error("An error occurred while removing user ID and name.");
      }
    }
  };

  const handleJSONExport = () => {
    const categoryMapping: any = {
      // convert the short forms to full form categories
      FPO: "For-Profit (FPO)",
      NPO: "Non-Profit (NPO)",
      GA: "Government Association (GA)",
      LB: "Local Business (LB)",
      CB: "Corporate Business (CB)",
    };

    const updatedData = {
      category: categoryMapping[data.ragData.category],
      name: data.ragData.name,
      type: data.ragData.type,
      description: data.ragData.description,
      resources: data.ragData.resources,
      phonenumber: data.ragData.phonenumber,
      email: data.ragData.email,
      summary: data.ragData.genpage.summary,
      reasons: data.ragData.genpage.reasons,
      flaws: data.ragData.genpage.flaws,
      process: data.ragData.genpage.process,
      sources: data.ragData.sources,
    };

    const partnerData = JSON.stringify(updatedData, null, 2); // format nicely
    const blob = new Blob([partnerData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.ragData.name}_partnerfind.json`; // TODO: name this better?
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCSVExport = () => {
    const categoryMapping: any = {
      // convert the short forms to full form categories
      FPO: "For-Profit (FPO)",
      NPO: "Non-Profit (NPO)",
      GA: "Government Association (GA)",
      LB: "Local Business (LB)",
      CB: "Corporate Business (CB)",
    };

    const updatedData = {
      category: categoryMapping[data.ragData.category],
      name: data.ragData.name,
      type: data.ragData.type,
      description: data.ragData.description,
      resources: data.ragData.resources,
      phonenumber: data.ragData.phonenumber,
      email: data.ragData.email,
      summary: data.ragData.genpage.summary,
      reasons: data.ragData.genpage.reasons,
      flaws: data.ragData.genpage.flaws,
      process: data.ragData.genpage.process,
      sources: data.ragData.sources,
    };

    const csvRows: string[] = [];
    const headers: (keyof typeof updatedData)[] = Object.keys(updatedData) as (keyof typeof updatedData)[];
    csvRows.push(headers.join(",")); // Header row

    const values = headers.map((header) =>
      JSON.stringify(updatedData[header], (key, value) => (value === null ? "" : value))
    ); // Handle null values
    csvRows.push(values.join(","));

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.ragData.name}_partnerfind.csv`; // TODO: name this better?
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExcelExport = async () => {
    const categoryMapping: any = {
      // convert the short forms to full form categories
      FPO: "For-Profit (FPO)",
      NPO: "Non-Profit (NPO)",
      GA: "Government Association (GA)",
      LB: "Local Business (LB)",
      CB: "Corporate Business (CB)",
    };

    const updatedData = {
      category: categoryMapping[data.ragData.category],
      name: data.ragData.name,
      type: data.ragData.type,
      description: data.ragData.description,
      resources: data.ragData.resources,
      phonenumber: data.ragData.phonenumber,
      email: data.ragData.email,
      summary: data.ragData.genpage.summary,
      reasons: data.ragData.genpage.reasons,
      flaws: data.ragData.genpage.flaws,
      process: data.ragData.genpage.process,
      sources: data.ragData.sources,
    };

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add header row
    worksheet.addRow(Object.keys(updatedData));

    // Add data row
    worksheet.addRow(Object.values(updatedData));

    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a link element and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.ragData.name}_partnerfind.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="container mx-auto p-12 md:p-32 lg:p-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl" style={{ color: "#22B357" }}>
                    {data.ragData.name}
                  </CardTitle>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <CardDescription>{data.ragData.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Partner Category:
                      </strong>
                      <br /> {data.ragData.category}
                    </p>
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Type:
                      </strong>
                      <br /> {data.ragData.type}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Provided Resources:
                      </strong>
                      <br />
                      {data.ragData.resources}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div className="max-w-sm">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl" style={{ color: "#22B357" }}>
                    Contact
                  </CardTitle>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <p>
                    <strong className="underline" style={{ color: "#22B357" }}>
                      Email:
                    </strong>
                    {data.ragData.email ? (
                      <a href={`mailto:${data.ragData.email}`} className="underline">
                        <br />
                        {data.ragData.email.toLowerCase()}
                      </a>
                    ) : (
                      " Not Available"
                    )}
                  </p>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Phone Number:
                      </strong>
                      <br />
                      {formatPhoneNumber(data.ragData.phonenumber)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <div>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Manage List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Checkbox id="addToList" checked={checked} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="addToList" className="ml-2">
                      {checked ? "Remove from your list" : "Add to your list"}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="md:col-span-1 md:col-start-2">
            <div className="max-w-sm">
              <Card>
                <CardHeader>
                  {note ? (
                    <CardTitle className="text-2xl" style={{ color: "#22B357" }}>
                      Current Note:
                    </CardTitle>
                  ) : (
                    <CardTitle className="text-2xl" style={{ color: "#22B357" }}>
                      Add your own note:
                    </CardTitle>
                  )}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <div className="grid gap-2">
                      <Label htmlFor="new-note">New Note</Label>
                      <Textarea id="new-note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                    </div>
                  ) : (
                    <div>{note ? note : "No notes added"}</div>
                  )}
                </CardContent>
                <CardFooter>
                  {editMode ? (
                    <div className="grid grid-cols-2 gap-6">
                      <Button variant="outline" onClick={() => handleSaveClick()}>
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <Button variant="outline" onClick={() => handleEditClick()}>
                        Edit
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="py-10">
              <Card className="w-full md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: "#22B357" }}>
                    Detailed AI Description of {data.ragData.name}:
                  </CardTitle>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Detailed Summary:
                      </strong>
                      <br /> {data.ragData.genpage.summary}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Resources Offered:
                      </strong>
                      <br />
                      {data.ragData.genpage.resources}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Reasons to Partner:
                      </strong>
                      <br />
                      {data.ragData.genpage.reasons}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Flaws about {data.ragData.name}:
                      </strong>
                      <br />
                      {data.ragData.genpage.flaws}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <p>
                      <strong className="underline" style={{ color: "#22B357" }}>
                        Steps to Partner:
                      </strong>
                      <br />
                      {data.ragData.genpage.process}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="w-full md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                {data.ragData.sources.map((result: any, index: any) => {
                  const score = parseFloat(result.score); // Ensure score is a float
                  const progressValue = !isNaN(score) ? score * 100 : 0; // Multiply by 100 if valid number, otherwise 0

                  return (
                    <div key={index} className="flex items-center justify-between mb-4">
                      <div>
                        <strong style={{ color: "#22B357" }}>{result.title}</strong>
                        <br />
                        <a
                          className="underline text-blue-500"
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.url}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span style={{ marginRight: "10px" }}>Article Relevancy: </span>
                        <CircleProgress value={Math.round(progressValue * 100) / 100} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button variant="outline" onClick={handleJSONExport}>
            Export This Data to JSON!
          </Button>
          <Button variant="outline" onClick={handleCSVExport} style={{ marginLeft: "10px" }}>
            Export This Data to CSV!
          </Button>
          <Button variant="outline" onClick={handleExcelExport} style={{ marginLeft: "10px" }}>
            Export This Data to an Excel Sheet!
          </Button>
        </div>
      </div>
    </>
  );
}
