import { currentUser } from '@clerk/nextjs';

export default function ProtectedPage() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-7xl text-center">you are in a protected page c:</h1>
        {/* <Button>Click me</Button> */}
      </div>
    </>
  );
}