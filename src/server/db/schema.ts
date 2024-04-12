import { pgTable, serial, text, doublePrecision, json, jsonb } from 'drizzle-orm/pg-core';
import { customType } from 'drizzle-orm/pg-core';

export const baseCompanies = pgTable('baseCompanies', {
  category: text('category'),
  name: text('name'),
  type: text('type'),
  description: text('description'),
  resources: text('resources'),
  phonenumber: text('phonenumber'),
  email: text('email'),
});

export const elaborateCompanies = pgTable('elaborateCompanies', {
  category: text('category'),
  name: text('name').primaryKey(),
  type: text('type'),
  description: text('description'),
  resources: text('resources'),
  phonenumber: text('phonenumber'),
  email: text('email'),
  genpage: json('genpage').default({ flaws: "flaws", process: "process", reasons: "reasons", summary: "summary", resources: "resources"}),
});

export const userCompanies = pgTable('userCompanies', {
  userID: text('userID').primaryKey(),
  name: text('name'),
  note: text('note'),
});



