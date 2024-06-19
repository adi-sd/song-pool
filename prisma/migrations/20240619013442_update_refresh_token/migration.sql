/*
  Warnings:

  - Made the column `refreshToken` on table `SpotifyAuthTable` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SpotifyAuthTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL
);
INSERT INTO "new_SpotifyAuthTable" ("accessToken", "id", "refreshToken") SELECT "accessToken", "id", "refreshToken" FROM "SpotifyAuthTable";
DROP TABLE "SpotifyAuthTable";
ALTER TABLE "new_SpotifyAuthTable" RENAME TO "SpotifyAuthTable";
CREATE UNIQUE INDEX "SpotifyAuthTable_accessToken_key" ON "SpotifyAuthTable"("accessToken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
