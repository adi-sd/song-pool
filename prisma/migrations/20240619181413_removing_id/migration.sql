/*
  Warnings:

  - The primary key for the `SpotifyAuthTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SpotifyAuthTable` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SpotifyAuthTable" (
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL
);
INSERT INTO "new_SpotifyAuthTable" ("accessToken", "refreshToken") SELECT "accessToken", "refreshToken" FROM "SpotifyAuthTable";
DROP TABLE "SpotifyAuthTable";
ALTER TABLE "new_SpotifyAuthTable" RENAME TO "SpotifyAuthTable";
CREATE UNIQUE INDEX "SpotifyAuthTable_accessToken_key" ON "SpotifyAuthTable"("accessToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
