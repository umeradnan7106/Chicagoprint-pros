-- CreateTable
CREATE TABLE "CustomProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopifyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "basePrice" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CustomVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "CustomVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CustomProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
