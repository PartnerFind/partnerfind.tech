import { pgTable, text, json, serial } from "drizzle-orm/pg-core";

export const baseCompanies = pgTable("baseCompanies", {
  category: text("category"),
  name: text("name"),
  type: text("type"),
  description: text("description"),
  resources: text("resources"),
  phonenumber: text("phonenumber"),
  email: text("email"),
});

export const elaborateCompanies = pgTable("elaborateCompanies", {
  category: text("category"),
  name: text("name").primaryKey(),
  type: text("type"),
  description: text("description"),
  resources: text("resources"),
  phonenumber: text("phonenumber"),
  email: text("email"),
  genpage: json("genpage").default({
    flaws: "flaws",
    process: "process",
    reasons: "reasons",
    summary: "summary",
    resources: "resources",
  }),
  sources: json("sources").default({
    title: "title",
    url: "url",
    score: "score",
  }),
});

export const userFavorites = pgTable("userFavorites", {
  id: serial("id").primaryKey(),
  userID: text("userID"),
  name: text("name"),
});

export const partnerNotes = pgTable("partnerNotes", {
  id: serial("id").primaryKey(),
  userID: text("userID"),
  name: text("name"),
  note: text("note"),
});
