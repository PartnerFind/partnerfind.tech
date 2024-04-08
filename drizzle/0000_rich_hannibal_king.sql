CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"phonenumber" double precision
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"category" text,
	"name" text,
	"type" text,
	"description" text,
	"resources" text,
	"phonenumber" text,
	"email" text
);
