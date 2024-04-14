"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton" // todo
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

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

    useEffect(() => {
        const fetchClerkUserID = async () => {
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
            } catch (error) {
                // Handle errors here
                console.error(error);
            }
        };
        fetchClerkUserID();
    }, []);

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
                    <div className="max-w-lg" style={{ marginLeft: 'auto', marginRight: '275px' }}>
                        <Card className="max-h-96 overflow-auto" style={{ width: '850px' }}>
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
                </div>
            </div>
        </>
    );
}