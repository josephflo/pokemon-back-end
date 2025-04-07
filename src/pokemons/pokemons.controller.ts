import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.createPokemon(createPokemonDto);
  }

  @Get()
  findByIdOrName(@Query('search') search?: string) {
    if (search) {
      return this.pokemonsService.findByIdOrName(search);
    }
    return this.pokemonsService.findAll();
  }

  @Get('check-name')
  async checkNameAvailability(@Query('name') name: string) {
    if (!name) {
      return { available: false, message: 'Nombre no proporcionado' };
    }

    const available = await this.pokemonsService.isNameAvailable(name);
    return {
      available,
      message: available ? 'Nombre disponible' : 'El nombre ya está en uso',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonsService.remove(+id);
  }
}
