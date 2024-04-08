CREATE TABLE IF NOT EXISTS "baseCompanies" (
	"category" text,
	"name" text,
	"type" text,
	"description" text,
	"resources" text,
	"phonenumber" text,
	"email" text
);
--> statement-breakpoint
DROP TABLE "companies";--> statement-breakpoint
DROP TABLE "company";