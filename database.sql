
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"(
  "id" SERIAL PRIMARY KEY,
  "userName" VARCHAR (250) NOT NULL,
  "firstName" VARCHAR (100) NOT NULL,
  "lastName" VARCHAR (100) NOT NULL
);

INSERT INTO "user" ("userName", "firstName", "lastName")
VALUES ('jClarkArt',  'Jim', 'Clark');

CREATE TABLE "artPieces" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "image" VARCHAR(500) NOT NULL,
  "price" numeric(12,2),
  "description" TEXT NOT NULL,
  "galleryStatus" BOOLEAN DEFAULT FALSE,
  "soldStatus" BOOLEAN DEFAULT FALSE,
  "galleryLocation" VARCHAR (255),
  "userId" INT REFERENCES "user" NOT NULL
);

INSERT INTO "artPieces" ("title", "image", "price", "description" ,"userId")
VALUES ('Menace 2 Society',  'https://pantone-aws-node-bucket.s3.amazonaws.com/uploads/2707391a-1d2d-4df4-9ed4-5f66162c021d-c16-143-burgeoning.png', 1200.00, 'This is a picture of my mom', 1);

CREATE TABLE "soldPieces" (
  "id" SERIAL PRIMARY KEY,
  "soldDate" TIMESTAMP, 
  "artId" INT REFERENCES "artPieces" NOT NULL,
  "locationSold" INT REFERENCES "location" 
);

CREATE TABLE "location" (
  "id" SERIAL PRIMARY KEY,
  "galleryName" VARCHAR(255) NOT NULL,
  "galleryAddress" VARCHAR(255) NOT NULL,
  "galleryCut" integer
);

INSERT INTO "location" ("galleryName", "galleryAddress", "galleryCut")
VALUES ('The Homey Gnome',  '3857 24th Ave S, Minneapolis, MN, 55046', 40);