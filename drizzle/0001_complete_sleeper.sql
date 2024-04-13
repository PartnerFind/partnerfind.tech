ALTER TABLE "partnerNotes" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "userFavorites" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "partnerNotes" DROP COLUMN IF EXISTS "drizzie";--> statement-breakpoint
ALTER TABLE "userFavorites" DROP COLUMN IF EXISTS "drizzie";