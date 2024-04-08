import {baseCompanies} from './schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import {config} from 'dotenv';

config ({
    path: '.env',
});

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);

const db = drizzle(sql);

const main = async () => {
    try {
        console.log("Seeding database");
        await db.delete(baseCompanies);

        await db.insert(baseCompanies).values([
            {
                category: "NPO",
                name: "St. Louis Area Foodbank",
                type: "Food",
                description: "St. Louis Area Foodbank. distributes 52,533,200 pounds of food to people facing hunger. Building stronger communities by empowering people with food and hope is a powerful mission to fulfill.",
                resources: "Food Assistance Programs, Nutrition Education, Community Outreach, Voluteer Opportunities, Holiday Meal Programs",
                phonenumber: "(314)-292-6262",
                email: "volunteer@stlfoodbank.org",
            },
            {
                category: "NPO",
                name: "St. Louis Childrens Hospital",
                type: "Healthcare",
                description: "Founded in 1879, SLCH is the oldest pediatric hospital west of the Mississippi River and the 7th oldest in the United States. SLCH has 455 licensed beds, which includes 77 pediatric intensive care beds, a 150-bed newborn intensive care unit, and a 16-bed pediatric bone marrow transplant unit.",
                resources: "Health Education Workshop, Mental Health Support, First Aid Training, School Health Clinics, Injury Prevention Programs",
                phonenumber: "(314)-454-6000",
                email: "gs-slchhlthinfosvcs@bjc.org",
            },
            {
                category: "NPO",
                name: "St. Louis Public Library Foundation",
                type: "Education",
                description: "The mission of the St. Louis Public Library Foundation is to support the Librarys programs and services through advocacy and fundraising and to build relationships with others who share a passion for the Librarys work.",
                resources: "Library Access, Study Support, Career Development, Technology Access, Educational Programs",
                phonenumber: "(314)-241-2288",
                email: "foundation@slplfoundation.org",
            },
            {
                category: "NPO",
                name: "Ronald McDonald House Charities of St. Louis",
                type: "Financial",
                description: "Ronald McDonald House Charities® of St. Louis provides a home-away-from-home for families of seriously ill children. These children (eighteen years and younger), who live outside a 50-mile radius of St. Louis, are treated at local area hospitals",
                resources: "Family Support, Financial Aid, Health Services, Meal Programs, Educational Support",
                phonenumber: "(314)-773-1100",
                email: "rbrown@rmhcstl.com",
            },
            {
                category: "NPO",
                name: "Beyond Housing",
                type: "Housing",
                description: "Beyond Housing is a nationally recognized community development organization that works to strengthen families and transform underserved communities to create a stronger, more equitable, and prosperous St. Louis region for all.",
                resources: "Housing Assistance, Financial Literacy, Employment Services, Youth Programs, Community Engagement",
                phonenumber: "(314)-533-0600",
                email: "ckrehmeyer@beyondhousing.org",
            },
            {
                category: "FPO",
                name: "Panera Bread",
                type: "Food",
                description: "Panera Bread Company owns and operates a chain of bakery-cafe fast casual restaurants. The Company offers breakfast sandwiches and wraps, salads, soups, pastries, coffee drinks, and other prepared foods for on-premise consumption. Panera Bread serves customers in the United States.",
                resources: "Food Donations, Meal Programs, Nutrition Education, Fundraising Opportunities, Employment Oppotunities",
                phonenumber: "(636)-230-6644",
                email: "panerabread@bamko.net",
            },
            {
                category: "FPO",
                name: "Build-A-Bear Workshop",
                type: "Education",
                description: "Originally conceived as a place for children to create their own special teddy bear with a step-by-step process including our now iconic Heart Ceremony, Build-A-Bear is now a multi-generational, multi-dimensional global brand appealing to diverse consumer demographics.",
                resources: "Workshop Tours, Team Building, Fundraising Events, Educational Workshops, Career Exploration",
                phonenumber: "(636)-237-6101",
                email: "Guest.Services@buildabear.com",
            },
            {
                category: "FPO",
                name: "Schnucks Markets",
                type: "Food",
                description: "Schnucks is a progressive, family-owned supermarket retailer with more than 100 stores in Missouri, Illinois, Indiana, and Wisconsin. Our corporate headquarters are located in St. Louis, Missouri.",
                resources: "Nutrition Workshops, Grocery Donations, Cooking Demonstrations, Job Opportunities, Community Engagement",
                phonenumber: "(314)-994-4400",
                email: "vendorcompliance@schnucks.com",
            },
            {
                category: "FPO",
                name: "Emerson Electric Co.",
                type: "Technology",
                description: "Emerson Electric Co., a technology and software company, provides various solutions for customers in industrial, commercial, and consumer markets in the Americas, Asia, the Middle East, Africa, and Europe.",
                resources: "STEM Education, Equipment Donations, Mentorship Opportunities, Internship Programs, Sponsorship Support",
                phonenumber: "(314)-553-2000",
                email: "itservicedesk@emerson.com",
            },
            {
                category: "FPO",
                name: "World Wide Technology",
                type: "Technology",
                description: "Founded in 1990, World Wide Technology (WWT), a global technology solutions provider with $20 billion in annual revenue, combines the power of strategy, execution and partnership to accelerate digital transformational outcomes for large public and private organizations around the world.",
                resources: "Technology Donations, STEM Education, Career Development, Mentorship Opportunities, Scholarship Programs",
                phonenumber: "(314)-569-7000",
                email: "chrisb@wwtraceway.com",
            },
            {
                category: "GA",
                name: "Missouri Department of Conservation",
                type: "Environment",
                description: "The Department of Conservation is guided by a four (4)-member commission appointed by the Governor with the advice and consent of the senate. The commission is charged with the control, management, restoration, conservation and regulation of the bird, fish, game, forestry and all wildlife resources of the state.",
                resources: "Outdoor Education, Conservation Programs, Outdoor Recreation, Educational Materials, Volunteer Opportunities",
                phonenumber: "(314)-301-1500",
                email: "CentralReg@mdc.mo.gov",
            },
            {
                category: "GA",
                name: "Metropolitan St. Louis Transit Agency",
                type: "Transportation",
                description: "Metro Transit is an enterprise of the Bi-State Development Agency and operates public transportation services in the St. Louis region. In 2022, the system had an annual ridership of 19,049,100, or about 62,000 per weekday as of the third quarter of 2023. Greater St. Louis, Missouri–Illinois, U.S.",
                resources: "Transportation Access, Safety Education, Internship Opportunities, Community Engagement, Environmental Initiatives",
                phonenumber: "(314)-982-1406",
                email: "customerservice@metrostlouis.org",
            },
            {
                category: "GA",
                name: "St. Louis Economic Development Partnership",
                type: "Financial",
                description: "The St. Louis Economic Development Partnership is a comprehensive economic development organization for St. Louis City and County, which attracts, retains, and facilitates growth of businesses and works collaboratively with public and private sector regional partners.",
                resources: "Career Guidance, Enterpreneurship Support, Workforce Training, Industry Insights, Economic Research",
                phonenumber: "(314)-615-7663",
                email: "etriplett@stlpartnership.com",
            },
            {
                category: "GA",
                name: "St. Louis Department of Education",
                type: "Education",
                description: "We will provide a quality education for all students and enable them to realize their full intellectual potential.",
                resources: "Academic Support, Counseling Services, Extracirricular Activities, College Preparation, Career Development",
                phonenumber: "(314)-231-3720",
                email: "certification@dese.mo.gov",
            },
            {
                category: "GA",
                name: "Missouri Department of Health",
                type: "Healthcare",
                description: "The Division of Community and Public Health is responsible for supporting and operating more than 100 programs and offices addressing public health issues such as communicable disease control, chronic disease management, genetic health conditions, cancer, pregnancy, vital statistics, oral health and health care access.",
                resources: "Health Education, Immunization Clinics, Mental Health Support, Sexual Health, Substance Abuse Prevention",
                phonenumber: "(314)-877-2800",
                email: "info@health.mo.gov",
            },
            {
                category: "LB",
                name: "Kaldis Coffee",
                type: "Food",
                description: "At Kaldis Coffee Roasting Company, we hand-roast all our coffees and blends in small batches. Our philosophy is to let the brilliance and beauty of our well-sourced beans shine through in the cup.",
                resources: "Coffee Catering, Fundraising Partnership, Student Discounts, Educational Workshops, Community Engagement",
                phonenumber: "(314)-727-9991",
                email: "info@kaldiscoffee.com",
            },
            {
                category: "LB",
                name: "St. Louis Shirt Co.",
                type: "Clothing",
                description: "STL Shirt Co is a premier, family-owned custom apparel company. Specializing in custom designs for schools, events, and businesses, we provide top-quality products to meet your unique needs. Offering screen printing, embroidery, vinyl, stickers/decals, and online store services, were the fastest in the St. Louis area!",
                resources: "Custom Apparel, Fundraising Support, Design Services, Event Promotion, Bulk Discounts",
                phonenumber: "(636)-926-2777",
                email: "mike@stlshirtco.com",
            },
            {
                category: "LB",
                name: "LaunchCode",
                type: "Technology",
                description: "LaunchCode is a nonprofit offering free tech education and job placement opportunities to bring new people from all backgrounds into the tech field and reshape the way employers think about hiring.",
                resources: "Coding Workshops, Tech Apprenticeships, Mentorship Programs, Career Pathways, Job Placement Assistance",
                phonenumber: "(314)-254-0107",
                email: "marketing@launchcode.org",
            },
            {
                category: "LB",
                name: "Missouri Coalition for the Environment",
                type: "Environment",
                description: "Missouri Coalition for the Environment (MCE) is Missouris independent, citizens environmental organization for clean water, clean air, clean energy, and a healthy environment. With the help of our members and allies we are making the world a better place.",
                resources: "Environmental Education, Advocacy Support, Youth Engagement, Green Initiatives, Outdoor Activities",
                phonenumber: "(314)-727-0600",
                email: "moenviron@moenvironment.org",
            },
            {
                category: "LB",
                name: "Local Harvest Grocery",
                type: "Food",
                description: "Produce, dairy, eggs, meat, bakery, grains, packaged goods, and more! Fewer food miles, fresher food. Better for you and the earth.",
                resources: "Local Produce, Nutrition Worshops, Food Education, Student Discounts, Community Outreach",
                phonenumber: "(314)-865-5260",
                email: "becca@localharvestgrocery.com",
            },
            {
                category: "CB",
                name: "Ameren Corporation",
                type: "Technology",
                description: "Ameren Corp (Ameren) is an energy holding company. It carries out the operations of rate regulated electricity and natural gas generation, transmission and distribution through its subsidiaries.",
                resources: "Energy Education, STEM Support, Internship Opportunities, Career Guidance, Safety Training",
                phonenumber: "(314)-621-3222",
                email: "communications@ameren.com",
            },
            {
                category: "CB",
                name: "Mastercard",
                type: "Financial",
                description: "Mastercard is a payment network processor. Mastercard partners with financial institutions that issue Mastercard payment cards processed exclusively on the Mastercard network. Mastercards primary source of revenue comes from the fees that it charges issuers based on each cards gross dollar volume.",
                resources: "Financial Literacy, STEM Scholarships, Career Development, Technology Education, Mentorship Programs",
                phonenumber: "(800)-627-8372",
                email: "BIN_Inquiries@mastercard.com",
            },
            {
                category: "CB",
                name: "BJC Healthcare",
                type: "Healthcare",
                description: "At BJC HealthCare, we serve patients in urban, suburban and rural communities through our 14 hospitals and multiple community health locations, providing inpatient and outpatient care, primary care, community health and wellness, workplace health, home health, community mental health, rehabilitation, and long-term care.",
                resources: "Health Education, Medical Services, Career Exploration, Mental Health Support, Community Outreach",
                phonenumber: "(636)-484-5220",
                email: "d_j@bjc.org",
            },
            {
                category: "CB",
                name: "Spectrum",
                type: "Technology",
                description: "Spectrum Mobile is a mobile virtual network operator (MVNO). It doesnt have a standalone mobile network like Verizon but instead leases and resells Verizons 4G LTE and 5G connections through the Spectrum Mobile brand.",
                resources: "Internet Access, Educational Content, Technology Support, Career Development, Community Engagement",
                phonenumber: "(314)-801-2296",
                email: "contact@spectrumam.com",
            },
            {
                category: "CB",
                name: "Boeing",
                type: "Technology",
                description: "Boeing in Brief. As a leading global aerospace company, Boeing develops, manufactures and services commercial airplanes, defense products and space systems for customers in more than 150 countries.",
                resources: "STEM Education, Career Pathways, Mentorship Programs, Educational Grants, Aviation Outreach",
                phonenumber: "(314)-232-0232",
                email: "media@boeing.com",
            },
        ]);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

await main();