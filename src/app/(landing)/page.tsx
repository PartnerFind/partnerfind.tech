export default function HomePage() {
  return (
    <>
      <div className="bg-white">
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 mb-20">
              
              <h1 className="text-8xl font-extrabold tracking-tight text-black sm:text-[8rem]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">PartnerFind</span>.tech
              </h1>
              <h3 className="text-3xl font-bold">Built using Clerk and the T3 Stack</h3>
            </div>
        </main>
      </div>
    </>
  );
}