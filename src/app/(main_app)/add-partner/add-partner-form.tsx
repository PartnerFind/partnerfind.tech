"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

const addPartnerFormSchema = z.object({ // Zod Schema for form validation
  business_name: z
  .string()
  .min(2, {
    message: "Business name must atleast 3 characters!",
  })
  .max(30, {
    message: "Business name must be under 30 characters!",
  }),
  zip_code: z
  .string()
  .length(5, {
    message: "Zipcode must be 5 characters!",
  }),
})

type AddPartnerFormValues = z.infer<typeof addPartnerFormSchema>

export function AddPartnerForm() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<AddPartnerFormValues>({
        resolver: zodResolver(addPartnerFormSchema),
        defaultValues: {
            business_name: "",
            zip_code: "",
        },
    })

    async function onFormSubmit(formData: AddPartnerFormValues) { // This is type-safe and validated by Zod.        
        let data = JSON.stringify(formData);
        try {
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: data,
            }
    
            const queryRag = await fetch('/api/rag', options);
            let ragResponse = await queryRag.json();
    
            const code = queryRag.status;
            if (code === 200) {
                toast({
                    title: `Yay! 🎉`,
                    description: (
                        <>
                            <div>
                                <h1 className="mt-2 w-[340px] rounded-md p-4 text-green-500">Successfully added &quot;{formData.business_name}&quot; to the directory!</h1>
                            </div>
                        </>
                    )
                })
                router.push(`/partners/${ragResponse.generation.name}`)
            } else if (code === 206) {
                toast({
                    title: `Uh Oh! Duplicate partner found in DB! 🚫`,
                    description: (
                        <>
                            <div>
                                <h1 className="mt-2 w-[340px] rounded-md p-4 text-yellow-500">Please resubmit with another potential partner.</h1>
                            </div>
                        </>
                    ),
                })
            } else if (code === 500) {
                toast({
                    title: `Error: Something failed when querying the AI! ❌`,
                    variant: "destructive",
                    description: (
                        <>
                            <div>
                                <h1 className="mt-2 w-[340px] rounded-md p-4 text-white">Uh oh! An unkwown error occured, please try again.</h1>
                            </div>
                        </>
                    ),
                })
            }
        } catch (error) {
            toast({
                title: `Error: Something failed when querying the AI! ❌`,
                variant: "destructive",
                description: (
                    <>
                        <div>
                            <h1 className="mt-2 w-[340px] rounded-md p-4 text-white">Uh oh! An unkwown error occured, please try again.</h1>
                        </div>
                    </>
                ),
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Barnes & Noble" {...field} />
                    </FormControl>
                    <FormMessage /> {/* zod messages come through this */}
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                        <Input placeholder="63017" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit">Add using AI!</Button>
            </form>
        </Form>
    );
}