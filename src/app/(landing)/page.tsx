'use client'

import React, { useState } from 'react';

const HomePage = (): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 mb-20">
              <h1 className="text-8xl font-extrabold tracking-tight text-white sm:text-[5.5rem]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">PartnerFind</span>.tech
              </h1>
            </div>
            {/* Q&A Section */}
          <div className="container mx-auto mt-20 mb-16">
            <h2 className="text-4xl font-semibold text-center mb-8" ><strong>About</strong></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Q&A Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>What is PartnerFind and what is it for?</h3>
                <p className="text-gray-700">PartnerFind is a website for your school’s Career and Technical Education Department to use to find possible “partners” or companies which they can work with to expand your school’s opportunities.</p>
              </div>

              {/* Q&A Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>How does PartnerFind work to do this?</h3>
                <p className="text-gray-700">PartnerFind gives you a list of companies to explore and find more about them as well. It provides you with not only essential information such as the resources it can provide and contact information, but it also gives you flaws of the business, reasons to partner with it, and the process to go through to establish a specific company as your parter</p>
              </div>

              {/* Q&A Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>What if I want to add my own company?</h3>
                <p className="text-gray-700">Let’s say you see that the Partnerfind database doesn’t have a specific company you want to see on there. You can give it a companies name, and zip code, to automatically generate a new entry using AI! Then you can add this to your own personalized list</p>
              </div>

              {/* Q&A Card 4 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>What do I do after I have already partnered with a company?</h3>
                <p className="text-gray-700">After you have already partnered, or established connections to a company, you can add it to your own list of companies. Use this list to also check potential companies you want to work with. You can also add notes for each company, such as what you plan to do with them, and you’ll see those notes every time you log onto the app.</p>
              </div>
            </div>
          </div>
          {/* How to Use Section */}
          <div className="container mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-center mb-8"><strong>How to Use</strong></h2>
            {/* Button to toggle the visibility of steps */}
            <div className="flex justify-center mb-8">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={toggleExpansion}
              >
                {isExpanded ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>

            {/* Steps Section */}
            {/* Render steps only if expanded */}
            {isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 1: Logging in/Signing Up</h3>
                  <p className="text-gray-700 text-sm md:text-base">Firstly, you have to log in or sign into the app using the buttons above, to go to your account with all your information. By logging in, all your information will be saved to your unique user ID, such as the companies you generate, the companies you select to be part of your list, and the notes you added to companies.</p>
                </div>
                {/* Step 2 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 2: The Explore Page</h3>
                  <p className="text-gray-700 text-sm md:text-base">Then you’ll be directed to the explore page by default. On the explore page you’ll see a list of all the companies or possible partners in a table listing their name, category of business, type of business, description, resources they provide for schools, and their email and phone number. You’ll have the option to add a partner to your own personalized list, and a universal search is used to sift through your options.</p>
                </div>
                {/* Step 3 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 3: Your List of Companies</h3>
                  <p className="text-gray-700 text-sm md:text-base">Then use the sidebar to go to your own personalized list, of the companies you selected but can also remove by unchecking them and reloading the page. The only difference between this and the explore page is it will only show the companies you are interested in partnering with, or want to partner with in the future. Now, click on each companies name to go to their own individual page.</p>
                </div>
                {/* Step 4 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 4: Each specific Company Page</h3>
                  <p className="text-gray-700 text-sm md:text-base">On each companies specific page, you’ll see more information than what was presented on the table. You can also add notes you can view for the company, and check or uncheck it from your own list. You’ll also see an even more detailed description created using AI of a summary, the resources they provide, reasons and flaws of the company and a process on how to partner with them.</p>
                </div>
                {/* Step 5 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 5: Generating a new company</h3>
                  <p className="text-gray-700 text-sm md:text-base">Finally, use the navigation bar to go to the Add Partner page. Here, you can insert a business’ name and the zip code to then use AI to generate a new entry in your global table. After this, our model will take you to the page of this newly generated company, and you’ll now see it on your explore page, or list page if you check mark it.</p>
                </div>
                {/* Step 6 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#22B357' }}>Step 6: Navigation/Side Bar</h3>
                  <p className="text-gray-700 text-sm md:text-base">Throughout the website, you’ll always see a handy navigation bar at the top and a sidebar to the left side of every page. The top navigation bar will take you to the home page, this page, and also your account setting, or if you’re not signed in, to sign in or sign up. The sidebar allows you to easily go to the explore page, your list, and to add a new partner.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;