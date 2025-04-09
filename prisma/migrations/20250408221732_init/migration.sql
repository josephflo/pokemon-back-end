/*
  Warnings:

  - You are about to drop the column `attack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `special_attack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `special_defense` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `sprite` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the `PokemonType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PokemonType" DROP CONSTRAINT "PokemonType_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonType" DROP CONSTRAINT "PokemonType_typeId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "attack",
DROP COLUMN "createdAt",
DROP COLUMN "defense",
DROP COLUMN "hp",
DROP COLUMN "special_attack",
DROP COLUMN "special_defense",
DROP COLUMN "speed",
DROP COLUMN "sprite",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "PokemonType";

-- DropTable
DROP TABLE "Type";
