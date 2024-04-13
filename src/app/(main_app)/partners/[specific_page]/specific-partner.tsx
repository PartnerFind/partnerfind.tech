"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton" // todo
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function DemoContainer({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn(
          "flex items-center justify-center [&>div]:w-full",
          className
        )}
        {...props}
      />
    )
  }

  function formatPhoneNumber(phoneNumber: any) {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
    // Format the phone number
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
  
    return formatted;
  }

export default function SpecificPartnerComponent( { data }: { data: any } ) {
    const [clerkUserID, setClerkUserID] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch clerkUserID
                const optionsGet = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const responseGet = await fetch(`/api/getClerkUserID`, optionsGet);
                const dataGet = await responseGet.json();
                const clerkUserID = dataGet?.userID;
                setClerkUserID(clerkUserID);
    
                // Check if user is in the list
                const optionsPost = {
                    next: { revalidate: 0 },
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: clerkUserID }), // Pass the user ID to the backend
                };
                const getAllDataWithUserID = await fetch('http://localhost:3000/api/db/fetch-all-rows-with-user', optionsPost);
                if (!getAllDataWithUserID.ok) {
                    throw new Error("Error fetching rows from DB.");
                }
                const getAllDataWithUserIDRes = await getAllDataWithUserID.json(); // data.data
                // Work with the fetched data here
                
            } catch (error) {
                // Handle errors here
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <DemoContainer>
                    {loading ? (
                        <Skeleton className="w-5 h-5 rounded-sm border"/>
                    ) : (
                        <Checkbox className="w-5 h-5" checked={ checked } /> // onCheckedChange={ handleCheckboxChange } 
                    )}
                    </DemoContainer>

                    <DemoContainer>
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
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Partner Category:</strong><br/> {data.ragData.category}</p>
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Type:</strong><br/> {data.ragData.type}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Provided Resources:</strong><br/>{data.ragData.resources}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </DemoContainer>
                </div>
                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <DemoContainer>
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
                                        {data.ragData.email}
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
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Phone Number:</strong><br/>{formatPhoneNumber(data.ragData.phonenumber)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </DemoContainer>
                </div>

                <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                    
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="default">Detailed AI Description of {data.ragData.name}!</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-100 overflow-auto">
                            <DemoContainer>
                            <Card>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Detailed Summary:</strong><br/> {data.ragData.genpage.summary}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Resources Offered:</strong><br/>{data.ragData.genpage.resources}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Reasons to Partner:</strong><br/>{data.ragData.genpage.reasons}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Flaws about {data.ragData.name}:</strong><br/>{data.ragData.genpage.flaws}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <p><strong className="underline" style={{ color: '#22B357' }}>Steps to Partner:</strong><br/>{data.ragData.genpage.process}</p>
                                </div>
                            </CardContent>
                        </Card>
                            </DemoContainer>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    );
}