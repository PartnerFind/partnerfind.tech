"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton" // todo
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast"

function formatPhoneNumber(phoneNumber: any) {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Format the phone number
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
    return formatted;
}

export default function SpecificPartnerComponent( { data }: { data: any } ) {
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
                    next: { revalidate: 0 },
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({ userID: clerkUserID, name: data.ragData.name }), // Pass the user ID to the backend
                };
        
                const getCurrentNote = await fetch('https://partnerfind.tech/api/db/getCurrentNote', options); // TODO
                if (getCurrentNote.ok) {
                    const getCurrentNoteRes = await getCurrentNote.json();
                    setNote(getCurrentNoteRes.data?.note);
                } else {
                    throw new Error("Error fetching rows from DB.");
                }

                const getCheckboxStatus = await fetch('https://partnerfind.tech/api/db/getCurrentList', options);
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

    const handleEditClick = () => {
        setEditMode(true);
        setNewNote(note || "");
    };

    const handleSaveClick = async () => {
        try {
            // Save the new note to the database
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ userID: clerkUserID, name: data.ragData.name, note: newNote }), // Pass the user ID, partner name, and new note to the backend
            };
    
            const saveNoteResponse = await fetch('https://partnerfind.tech/api/db/saveNote', options); // TODO: Replace with actual endpoint
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
        if (!checked) { // user wants to add to their list
          try {
            console.log("unchecked")
            const options = {
              next: { revalidate: 0 }, // make sure its fresh every call
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({ data: { userID: clerkUserID, name: data.ragData.name }}) // Pass the user ID and name fields to the backend
            };

            const addToList = await fetch(`https://partnerfind.tech/api/db/addToList`, options);
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
                )
            })
            } else {
              throw new Error("Error adding user ID and name.");
            }
          } catch (error) {
            throw new Error("An error occurred while adding user ID and name.");
          }
        } else if (checked) { // user wants to remove from their list (userID already exists in data for these)
            console.log("checked")
          
            try {
                const options = {
                next: { revalidate: 0 }, // make sure its fresh every call
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ data: { userID: clerkUserID, name: data.ragData.name } }), // Pass the user ID and name fields to the backend
                };
            
                const removeFromList = await fetch(`https://partnerfind.tech/api/db/removeFromList`, options);
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
                    })
                } else {
                throw new Error("Error removing user ID and name.");
                }
          } catch (error) {
            throw new Error("An error occurred while removing user ID and name.");
          }
        }
      };

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-12 pt-0 ml-auto">
                    <div className="flex justify-center">
                        <div className="max-w-lg">
                            <Card>
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl" style={{ color: '#22B357' }}>{data.ragData.name}</CardTitle>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <CardDescription>{data.ragData.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Partner Category:</strong><br /> {data.ragData.category}</p>
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Type:</strong><br /> {data.ragData.type}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Provided Resources:</strong><br />{data.ragData.resources}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="max-w-lg">
                            <Card>
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl" style={{ color: '#22B357' }}>Contact</CardTitle>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <p>
                                        <strong className="underline" style={{ color: '#22B357' }}>Email:</strong>
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
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Phone Number:</strong><br />{formatPhoneNumber(data.ragData.phonenumber)}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-12 pt-0">
                    <div className="max-w-lg" style={{ marginLeft: 'auto', marginRight: '275px', marginTop: '-100px', }}> {/* margin Top adjusts the height of the notes box */}
                        <div className="flex justify-center">
                            <div className="max-w-lg" style={{ marginLeft: '1000px', }}>
                                <Card className="max-h-100" style={{ width: '300px'}}>
                                    <CardHeader>
                                        {note ? (
                                            <CardTitle className="text-2xl" style={{ color: '#22B357' }}>
                                                Current Note:
                                            </CardTitle>
                                        ) : (
                                            <CardTitle className="text-2xl" style={{ color: '#22B357' }}>
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
                                    <div>
                                        {note ? note : "No notes added"}
                                    </div>
                                )}
                                    </CardContent>
                                    <CardFooter>
                                {editMode ? (
                                    <div className="grid grid-cols-2 gap-6">
                                        <Button variant="outline" onClick={() => handleSaveClick()}>Save</Button>
                                        <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-6">
                                        <Button variant="outline" onClick={() => handleEditClick()}>Edit</Button>
                                    </div>
                                )}
                            </CardFooter>
                                </Card>
                            </div>
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <Card className="max-h-96 overflow-auto mb-6" style={{ width: '850px' }}>
                                <CardHeader>
                                    <CardTitle className="text-2xl" style={{ color: '#22B357' }}>Detailed AI Description of {data.ragData.name}:</CardTitle>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>    
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Detailed Summary:</strong><br /> {data.ragData.genpage.summary}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Resources Offered:</strong><br />{data.ragData.genpage.resources}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Reasons to Partner:</strong><br />{data.ragData.genpage.reasons}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Flaws about {data.ragData.name}:</strong><br />{data.ragData.genpage.flaws}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <p><strong className="underline" style={{ color: '#22B357' }}>Steps to Partner:</strong><br />{data.ragData.genpage.process}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', right: '4.5%', transform: 'translateY(-50%)' }}>
                        <div className="flex items-center">
                            {/* Conditional rendering of skeleton or checkbox based on loading state */}
                            {loading ? (
                                <Skeleton className="w-11 h-11 rounded-sm border"/>
                            ) : (
                                <Checkbox checked={ checked } onCheckedChange={ (handleCheckboxChange) } style={{ width: '40px', height: '40px' }}/>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}