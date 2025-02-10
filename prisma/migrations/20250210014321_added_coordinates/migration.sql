-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "streetNumber" INTEGER,
    "county" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "Lat" REAL NOT NULL DEFAULT 10,
    "Lng" REAL NOT NULL DEFAULT 10,
    "countryCode" TEXT NOT NULL
);
INSERT INTO "new_Address" ("cep", "countryCode", "county", "id", "state", "streetName", "streetNumber") SELECT "cep", "countryCode", "county", "id", "state", "streetName", "streetNumber" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
