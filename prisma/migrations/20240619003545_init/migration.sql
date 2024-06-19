-- CreateTable
CREATE TABLE "SpotifyAuthTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyAuthTable_accessToken_key" ON "SpotifyAuthTable"("accessToken");
