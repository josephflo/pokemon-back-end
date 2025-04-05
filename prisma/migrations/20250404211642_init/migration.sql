/*
  Warnings:

  - You are about to drop the column `level` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `base_experience` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "level",
DROP COLUMN "type",
ADD COLUMN     "base_experience" INTEGER NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;
