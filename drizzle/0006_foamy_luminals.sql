CREATE TABLE IF NOT EXISTS "Companies_1" (
	"category" text,
	"name" text PRIMARY KEY NOT NULL,
	"type" text,
	"description" text,
	"resources" text,
	"phonenumber" text,
	"email" text,
	"genpage" json DEFAULT '{"flaws":"flaws","process":"process","reasons":"reasons","summary":"summary","resources":"resources"}'::json
);
