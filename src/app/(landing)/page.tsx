import React from 'react';

const HomePage = (): React.JSX.Element => {
  return (
    <>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 mb-20">
              
              <h1 className="text-8xl font-extrabold tracking-tight text-white sm:text-[5.5rem]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">PartnerFind</span>.tech
              </h1>
            </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;