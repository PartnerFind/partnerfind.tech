import { AddPartnerForm } from "./add-partner-form";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "PartnerFind | Explore"
};

export default async function AddPartnerpage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-screen-md">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Add a new business / community partner to the explore directory</h3>
                        <p className="text-sm text-muted-foreground">
                            Just add the business name and zip code, and AI will take care of the rest!
                            (Please wait up to 15 seconds for the AI to process the information.)
                        </p>
                    </div>
                    <Separator/>
                    <AddPartnerForm/>
                </div>  
            </div>
        </div>
    );
}