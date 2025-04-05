import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PokemonsService } from './pokemons/pokemons.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pokemonsService = app.get(PokemonsService);

  const existingCount = await pokemonsService.countPokemons();
  if (existingCount === 0) {
    console.log('Base de datos vacía, importando pokemons...');
    await pokemonsService.importFromApi(150);
  } else {
    console.log(`Ya hay ${existingCount} pokemons en la base de datos.`);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
