-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "CustomVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CustomProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomVariant" ("id", "price", "productId", "title") SELECT "id", "price", "productId", "title" FROM "CustomVariant";
DROP TABLE "CustomVariant";
ALTER TABLE "new_CustomVariant" RENAME TO "CustomVariant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
