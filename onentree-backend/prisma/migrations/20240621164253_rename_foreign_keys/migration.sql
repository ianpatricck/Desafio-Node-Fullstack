/*
  Warnings:

  - You are about to drop the column `placeId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `places` table. All the data in the column will be lost.
  - Added the required column `place_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_placeId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_typeId_fkey";

-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_typeId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "placeId",
DROP COLUMN "typeId",
ADD COLUMN     "place_id" VARCHAR(100) NOT NULL,
ADD COLUMN     "type_id" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "places" DROP COLUMN "typeId",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "place_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "event_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
