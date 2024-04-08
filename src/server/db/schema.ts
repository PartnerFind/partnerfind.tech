import { pgTable, serial, text, doublePrecision, json } from 'drizzle-orm/pg-core';

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
  name: text('name'),
  type: text('type'),
  description: text('description'),
  resources: text('resources'),
  phonenumber: text('phonenumber'),
  email: text('email'),
  genpage: json('genpage'),
});