import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
    const existing = await this.prisma.pokemon.findUnique({
      where: { name: data.name },
    });
  
    if (existing) {
      throw new ConflictException(`El nombre "${data.name}" ya está en uso.`);
    }
  
    return await this.prisma.pokemon.create({
      data,
    });
  }

  findAll() {
    return this.prisma.pokemon.findMany();
  }

  async findOne(id: number) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!pokemon) {
      throw new NotFoundException(`There is no Pokémon with ID ${id}`);
    }

    return pokemon;
  }

  async findByIdOrName(search: string) {
    const id = parseInt(search, 10);

    // Intentamos buscar por ID exacto
    if (!isNaN(id)) {
      const pokemonById = await this.prisma.pokemon.findUnique({
        where: { id },
      });
      if (pokemonById) return pokemonById;
    }

    // Buscar por nombre parcial (ordenado por nombre ascendente)
    const pokemonsByName = await this.prisma.pokemon.findMany({
      where: {
        name: {
          contains: search.toLowerCase(),
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (pokemonsByName.length === 0) {
      throw new NotFoundException(`No se encontraron Pokémons con "${search}"`);
    }

    return pokemonsByName;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const existing = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error(`El Pokémon con ID ${id} no existe`);
    }

    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error(`No existe el Pokémon con ID ${id}`);
    }

    return this.prisma.pokemon.delete({
      where: { id },
    });
  }

  async isNameAvailable(name: string): Promise<boolean> {
    const existing = await this.prisma.pokemon.findUnique({
      where: { name },
    });
  
    return !existing;
  }

  // COUNT, IMPORT FROM API AND ADD TO POKEMONS DATABASE
  async countPokemons(): Promise<number> {
    return this.prisma.pokemon.count();
  }

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
