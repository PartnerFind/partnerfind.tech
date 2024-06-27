"use client";

import React, { useState } from "react";
import Particles from "@/components/magicui/particles";
import Meteors from "@/components/magicui/meteors";
import { BentoGrid, BentoGridItem } from "@/components/aui/bento-grid";

const HomePage = (): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const items = [
    {
      title: "What is PartnerFind and what is it for?",
      description:
        "PartnerFind is a website for your school’s Career and Technical Education Department to use to find possible “partners” or companies which they can work with to expand your school’s opportunities.",
    },
    {
      title: "How does PartnerFind work to do this?",
      description:
        "PartnerFind gives you a list of companies to explore and find more about them as well. It provides you with essential information such as the resources it can provide, contact information, reasons to partner with it, and the process to establish a specific company as your partner.",
    },
    {
      title: "What if I want to add my own company?",
      description:
        "If the Partnerfind database doesn’t have a specific company you want to see, you can provide its name and zip code to automatically generate a new entry using AI. Then you can add this company to your own personalized list.",
    },
    {
      title: "What do I do after I have already partnered with a company?",
      description:
        "After partnering or establishing connections with a company, you can add it to your own list. Use this list to manage potential companies you want to work with, including adding notes for each company.",
    },
  ];

  return (
    <>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-center relative">
          {/* Full-page Particles */}
          <Particles className="absolute inset-0 z-0 pointer-events-none" quantity={125} ease={80} size={0.5} refresh />

          <div className="container mb-20 mt-20 flex flex-col items-center justify-center gap-12 px-4 py-16 md:mt-40 relative z-10">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl relative z-10">
              <Meteors number={4} />
              <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                PartnerFind
              </span>
              .tech
            </h1>
          </div>

          <div className="container mx-auto my-20 relative z-10">
            <h2 className="mb-8 text-center text-4xl font-semibold">
              <strong>About</strong>
            </h2>
            {/* Bento Grid Section */}
            <BentoGrid className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {items.map((item, index) => (
                <BentoGridItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  className="rounded-lg bg-green-500 p-6 shadow-md"
                />
              ))}
            </BentoGrid>
          </div>

          <div className="container mx-auto mb-16 relative z-10">
            <h2 className="mb-8 text-center text-4xl font-semibold">
              <strong>How to Use</strong>
            </h2>
            <div className="mb-8 flex justify-center">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                onClick={toggleExpansion}
              >
                {isExpanded ? "Hide Steps" : "Show Steps"}
              </button>
            </div>
            {isExpanded && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Step 1 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 1: Logging in/Signing Up
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    Firstly, you have to log in or sign into the app using the buttons above, to go to your account with
                    all your information. By logging in, all your information will be saved to your unique user ID, such
                    as the companies you generate, the companies you select to be part of your list, and the notes you
                    added to companies.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 2: The Explore Page
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    Then you’ll be directed to the explore page by default. On the explore page you’ll see a list of all
                    the companies or possible partners in a table listing their name, category of business, type of
                    business, description, resources they provide for schools, and their email and phone number. You’ll
                    have the option to add a partner to your own personalized list, and a universal search is used to
                    sift through your options.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 3: Your List of Companies
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    Then use the sidebar to go to your own personalized list, of the companies you selected but can also
                    remove by unchecking them and reloading the page. The only difference between this and the explore
                    page is it will only show the companies you are interested in partnering with, or want to partner
                    with in the future. Now, click on each companies name to go to their own individual page.
                  </p>
                </div>
                {/* Step 4 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 4: Each specific Company Page
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    On each companies specific page, you’ll see more information than what was presented on the table.
                    You can also add notes you can view for the company, and check or uncheck it from your own list.
                    You’ll also see an even more detailed description created using AI of a summary, the resources they
                    provide, reasons and flaws of the company and a process on how to partner with them.
                  </p>
                </div>
                {/* Step 5 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 5: Generating a new company
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    Finally, use the navigation bar to go to the Add Partner page. Here, you can insert a business’ name
                    and the zip code to then use AI to generate a new entry in your global table. After this, our model
                    will take you to the page of this newly generated company, and you’ll now see it on your explore
                    page, or list page if you check mark it.
                  </p>
                </div>
                {/* Step 6 */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: "#22B357" }}>
                    Step 6: Navigation/Side Bar
                  </h3>
                  <p className="text-sm text-gray-700 md:text-base">
                    Throughout the website, you’ll always see a handy navigation bar at the top and a sidebar to the
                    left side of every page. The top navigation bar will take you to the home page, this page, and also
                    your account setting, or if you’re not signed in, to sign in or sign up. The sidebar allows you to
                    easily go to the explore page, your list, and to add a new partner.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
