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
CREATE TABLE IF NOT EXISTS "elaborateCompanies" (
	"category" text,
	"name" text PRIMARY KEY NOT NULL,
	"type" text,
	"description" text,
	"resources" text,
	"phonenumber" text,
	"email" text,
	"genpage" json DEFAULT '{"flaws":"flaws","process":"process","reasons":"reasons","summary":"summary","resources":"resources"}'::json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "partnerNotes" (
	"userID" text,
	"name" text,
	"note" text,
	"drizzie" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userFavorites" (
	"userID" text,
	"name" text,
	"drizzie" text PRIMARY KEY NOT NULL
);
