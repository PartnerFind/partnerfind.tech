CREATE TABLE IF NOT EXISTS "userFavorites" (
	"userID" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
ALTER TABLE "userCompanies" RENAME TO "partnerNotes";--> statement-breakpoint
ALTER TABLE "partnerNotes" ADD COLUMN "note" text;