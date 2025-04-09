-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "base_experience" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "special_attack" INTEGER NOT NULL,
    "special_defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "sprite" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonType" (
    "pokemonId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "PokemonType_pkey" PRIMARY KEY ("pokemonId","typeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonType" ADD CONSTRAINT "PokemonType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
