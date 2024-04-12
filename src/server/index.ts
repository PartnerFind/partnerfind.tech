import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { baseCompanies } from './db/schema';
import { elaborateCompanies } from './db/schema';
import { config } from 'dotenv';
import { currentUser } from '@clerk/nextjs';

config ({
    path: '.env',
});

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);
export const db = drizzle(sql);

//const user = await currentUser();

//Object of the entire table
const Companies = await db.select().from(elaborateCompanies);
//console.log(Companies);


//Full data for the elaborateCompanies table, using this table you can create objects for each individual row (aka Company)
const allData = await db.select({
  genpage: elaborateCompanies.genpage as any,
  category: elaborateCompanies.category,
  name: elaborateCompanies.name,
  type: elaborateCompanies.type,
  description: elaborateCompanies.description,
  resources: elaborateCompanies.resources,
  phonenumber: elaborateCompanies.phonenumber,
  email: elaborateCompanies.email,
}).from(elaborateCompanies).execute();


//Object for the Company Bombay Bazar
const bombayBazar = allData.find(item => item.name === "Bombay Bazar");


//By running the following you can print each part of the Bombay Bazar object such as its description, type, category and each individual part of its genpage
// console.log(bombayBazar?.name);
// console.log(bombayBazar?.category);
// console.log(bombayBazar?.description);
// console.log(bombayBazar?.type);
// console.log(bombayBazar?.resources);
// console.log(bombayBazar?.phonenumber);
// console.log(bombayBazar?.email);
// console.log(bombayBazar?.genpage?.summary);
// console.log(bombayBazar?.genpage?.resources);
// console.log(bombayBazar?.genpage?.reasons);
// console.log(bombayBazar?.genpage?.flaws);
// console.log(bombayBazar?.genpage?.process);


//If you want to create an object by the id in the table do the following, which selects the Company that is in the first row of the table
const readyReaders = allData[0];


//Then just as done above, you can print the name of the company to find out what it is
// console.log(readyReaders?.name);


//Use a for each loop to print all of a specific category for all companies in the table, such as the script below that prints all the flaws of the genpage of all companies in the table
allData.forEach(item => {
  // console.log(item.genpage.flaws);
})



  
