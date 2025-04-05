import { Injectable, Logger } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pokemon, Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PokemonsService {
  private readonly logger = new Logger(PokemonsService.name);
  constructor(private prisma: PrismaService) {}

  async createPokemon(data: CreatePokemonDto): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data,
    });
  }

  findAll() {
    return this.prisma.pokemon.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  // 👇 NUEVO: Cuenta cuántos pokémon hay en la base de datos
  async countPokemons(): Promise<number> {
    return this.prisma.pokemon.count();
  }

  // 👇 NUEVO: Importa desde la API externa
  async importFromApi(limit = 10, offset = 0): Promise<void> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const { data } = await axios.get(url);
    const results = data.results;

    for (const result of results) {
      const pokemonData = await axios.get(result.url);
      const pokemon = pokemonData.data;

      // Chequear si ya existe por nombre
      const existing = await this.prisma.pokemon.findUnique({
        where: { name: pokemon.name },
      });

      if (!existing) {
        await this.prisma.pokemon.create({
          data: {
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            base_experience: pokemon.base_experience,
          },
        });
        this.logger.log(`Creado: ${pokemon.name}`);
      } else {
        this.logger.log(`Ya existe: ${pokemon.name}`);
      }
    }
  }
}
