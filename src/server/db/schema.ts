import { pgTable, serial, text, doublePrecision, json, jsonb } from 'drizzle-orm/pg-core';
//import { jsonbField } from 'your_helper_path';
import { customType } from 'drizzle-orm/pg-core';

export type GenPageType = {
  summary: string;
  reasons: string;
  resources: string;
  flaws: string;
  process: string;
};

export const genPageJsonb = customType<{ data: GenPageType; driverData: string }>({
  dataType() {
    return 'jsonb';
  },
  toDriver(value: GenPageType): string {
    return JSON.stringify(value);
  },
  fromDriver(value: string): GenPageType {
    return JSON.parse(value);
  },
});

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
  genpage: genPageJsonb('genpage'),
});

