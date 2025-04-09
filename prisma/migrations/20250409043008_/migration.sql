/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BookSeries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Download` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ebook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EbookFormat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EbookSeries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReadingHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReadingSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `slug` to the `Ebook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "penName" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Author" ("bio", "createdAt", "id", "penName", "userId") SELECT "bio", "createdAt", "id", "penName", "userId" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_userId_key" ON "Author"("userId");
CREATE TABLE "new_BookSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seriesName" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_BookSeries" ("description", "id", "seriesName") SELECT "description", "id", "seriesName" FROM "BookSeries";
DROP TABLE "BookSeries";
ALTER TABLE "new_BookSeries" RENAME TO "BookSeries";
CREATE UNIQUE INDEX "BookSeries_seriesName_key" ON "BookSeries"("seriesName");
CREATE TABLE "new_Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "chapter" TEXT,
    "position" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("chapter", "createdAt", "ebookId", "id", "position", "userId") SELECT "chapter", "createdAt", "ebookId", "id", "position", "userId" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Category" ("description", "id", "name", "slug") SELECT "description", "id", "name", "slug" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE TABLE "new_Download" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "downloadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Download_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Download_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Download" ("downloadedAt", "ebookId", "id", "userId") SELECT "downloadedAt", "ebookId", "id", "userId" FROM "Download";
DROP TABLE "Download";
ALTER TABLE "new_Download" RENAME TO "Download";
CREATE TABLE "new_Ebook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT,
    "categoryId" TEXT,
    "coverImage" TEXT,
    "language" TEXT,
    "source" TEXT,
    "publishedDate" DATETIME,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "follows" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ebook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ebook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ebook" ("authorId", "categoryId", "coverImage", "createdAt", "description", "follows", "id", "language", "likes", "publishedDate", "source", "title", "views") SELECT "authorId", "categoryId", "coverImage", "createdAt", "description", "follows", "id", "language", "likes", "publishedDate", "source", "title", "views" FROM "Ebook";
DROP TABLE "Ebook";
ALTER TABLE "new_Ebook" RENAME TO "Ebook";
CREATE UNIQUE INDEX "Ebook_slug_key" ON "Ebook"("slug");
CREATE TABLE "new_EbookFormat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ebookId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    CONSTRAINT "EbookFormat_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EbookFormat" ("ebookId", "filePath", "format", "id") SELECT "ebookId", "filePath", "format", "id" FROM "EbookFormat";
DROP TABLE "EbookFormat";
ALTER TABLE "new_EbookFormat" RENAME TO "EbookFormat";
CREATE UNIQUE INDEX "EbookFormat_ebookId_format_key" ON "EbookFormat"("ebookId", "format");
CREATE TABLE "new_EbookSeries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seriesId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "volumeNumber" INTEGER NOT NULL,
    CONSTRAINT "EbookSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "BookSeries" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EbookSeries_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EbookSeries" ("ebookId", "id", "seriesId", "volumeNumber") SELECT "ebookId", "id", "seriesId", "volumeNumber" FROM "EbookSeries";
DROP TABLE "EbookSeries";
ALTER TABLE "new_EbookSeries" RENAME TO "EbookSeries";
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("createdAt", "ebookId", "id", "userId") SELECT "createdAt", "ebookId", "id", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE TABLE "new_ReadingHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "lastReadAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReadingHistory_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReadingHistory" ("createdAt", "ebookId", "id", "lastReadAt", "progress", "updatedAt", "userId") SELECT "createdAt", "ebookId", "id", "lastReadAt", "progress", "updatedAt", "userId" FROM "ReadingHistory";
DROP TABLE "ReadingHistory";
ALTER TABLE "new_ReadingHistory" RENAME TO "ReadingHistory";
CREATE TABLE "new_ReadingSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fontSize" INTEGER NOT NULL DEFAULT 16,
    "backgroundColor" TEXT NOT NULL DEFAULT 'white',
    "textColor" TEXT NOT NULL DEFAULT 'black',
    "lineSpacing" REAL NOT NULL DEFAULT 1.5,
    "theme" TEXT NOT NULL DEFAULT 'light',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReadingSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReadingSettings" ("backgroundColor", "fontSize", "id", "lineSpacing", "textColor", "theme", "updatedAt", "userId") SELECT "backgroundColor", "fontSize", "id", "lineSpacing", "textColor", "theme", "updatedAt", "userId" FROM "ReadingSettings";
DROP TABLE "ReadingSettings";
ALTER TABLE "new_ReadingSettings" RENAME TO "ReadingSettings";
CREATE UNIQUE INDEX "ReadingSettings_userId_key" ON "ReadingSettings"("userId");
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ebookId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("comment", "createdAt", "ebookId", "id", "rating", "userId") SELECT "comment", "createdAt", "ebookId", "id", "rating", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "birthday" DATETIME,
    "gender" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'reader',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("avatar", "birthday", "createdAt", "email", "fullName", "gender", "id", "passwordHash", "phone", "role", "updatedAt", "username") SELECT "avatar", "birthday", "createdAt", "email", "fullName", "gender", "id", "passwordHash", "phone", "role", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
