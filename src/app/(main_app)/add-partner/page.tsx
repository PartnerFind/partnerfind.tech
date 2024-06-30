import { AddPartnerForm } from "./add-partner-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "Add a Partner | PartnerFind",
};

export default async function AddPartnerPage() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Please Sign In to Add a Partner!</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-screen-md">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Add a new business / community partner to the explore directory</h3>
            <div className="text-sm text-muted-foreground">
              Just add the business name and zip code, and AI will take care of the rest! (Please wait up to 15 seconds
              for the AI to process the information.)
            </div>
          </div>
          <Separator />
          <AddPartnerForm />
        </div>
      </div>
    </div>
  );
}
