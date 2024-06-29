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

  const Aboutitems = [
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

  const Stepsitems = [
    {
      title: "Step 1: Logging in/Signing Up",
      description:
        "To start using PartnerFind, log in or sign up to access your account. Logging in ensures all your information, including saved companies, lists, and notes, is tied to your unique user ID for personalized management.",
    },
    {
      title: "Step 2: The Explore Page",
      description:
        "Navigate to the Explore page to view a categorized list of companies. Each profile includes descriptions, resources for schools, and contact information. Explore and add potential partners to your personalized list.",
    },
    {
      title: "Step 3: Your List of Companies",
      description:
        "Manage your personalized list using the sidebar. Easily add or remove companies you're interested in partnering with or exploring further. Streamline your selection process with this feature.",
    },
    {
      title: "Step 4: Each Specific Company Page",
      description:
        "Click on any company name to view detailed profiles. Access comprehensive information, including AI-generated summaries, resources, reasons for partnership, and partnership process. Add notes and manage preferences.",
    },
    {
      title: "Step 5: Generating a New Company",
      description:
        "Generate a new company entry using AI if it's not listed. Enter the company's name and zip code on the Add Partner page. Instantly create and explore this new partner for potential collaboration.",
    },
    {
      title: "Step 6: Navigation/Side Bar",
      description:
        "Use the top navigation bar for quick access to the homepage, account settings, sign-in, and sign-up options. The sidebar on every page allows easy navigation to the Explore page, your list, and Add Partner.",
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
              {Aboutitems.map((item, index) => (
                <BentoGridItem
                  key={index}
                  title={<h3 className="text-2xl font-bold text-green-500">{item.title}</h3>}
                  description={<p className="text-lg text-white font-medium">{item.description}</p>}
                  className="bg-[#191919] rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:shadow-xl"
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
              <div>
                <BentoGrid className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {Stepsitems.map((item, index) => (
                    <BentoGridItem
                      key={index}
                      title={<h3 className="text-2xl font-bold text-green-500">{item.title}</h3>}
                      description={<p className="text-lg text-white font-medium">{item.description}</p>}
                      className="bg-[#191919] rounded-lg p-4 shadow-md transition duration-300 ease-in-out transform hover:shadow-xl"
                    />
                  ))}
                </BentoGrid>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
