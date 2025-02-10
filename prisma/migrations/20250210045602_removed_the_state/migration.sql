-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cep" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "streetNumber" INTEGER,
    "county" TEXT NOT NULL,
    "state" TEXT,
    "Lat" REAL NOT NULL DEFAULT 10,
    "Lng" REAL NOT NULL DEFAULT 10,
    "countryCode" TEXT NOT NULL,
    "complement" TEXT
);
INSERT INTO "new_Address" ("Lat", "Lng", "cep", "complement", "countryCode", "county", "id", "state", "streetName", "streetNumber") SELECT "Lat", "Lng", "cep", "complement", "countryCode", "county", "id", "state", "streetName", "streetNumber" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
