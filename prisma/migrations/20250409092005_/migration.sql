/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Ebook` table. All the data in the column will be lost.
  - You are about to drop the column `follows` on the `Ebook` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Ebook` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "EbookCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ebookId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "EbookCategory_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EbookCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EbookLike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EbookLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EbookLike_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EbookFollow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EbookFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EbookFollow_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ebook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "summary" TEXT,
    "authorId" TEXT,
    "coverImage" TEXT,
    "language" TEXT,
    "source" TEXT,
    "publishedDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ebook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ebook" ("authorId", "coverImage", "createdAt", "description", "id", "language", "publishedDate", "slug", "source", "title", "views") SELECT "authorId", "coverImage", "createdAt", "description", "id", "language", "publishedDate", "slug", "source", "title", "views" FROM "Ebook";
DROP TABLE "Ebook";
ALTER TABLE "new_Ebook" RENAME TO "Ebook";
CREATE UNIQUE INDEX "Ebook_slug_key" ON "Ebook"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "EbookCategory_ebookId_categoryId_key" ON "EbookCategory"("ebookId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "EbookLike_userId_ebookId_key" ON "EbookLike"("userId", "ebookId");

-- CreateIndex
CREATE UNIQUE INDEX "EbookFollow_userId_ebookId_key" ON "EbookFollow"("userId", "ebookId");
