import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom, map } from 'rxjs';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable()
export class PokemonService {
  @Inject()
  private readonly http: HttpService;
  @Inject(CACHE_MANAGER)
  private readonly cache: Cache;

  async list() {
    const CACHE_KEY = 'pokemon_list';
    const cached = await this.cache.get(CACHE_KEY);
    if (cached) {
      console.log({ cached });
      return cached;
    }
    const list$ = this.http.get(BASE_URL).pipe(
      map((res) => res.data.results),
      catchError((err) => {
        throw err;
      }),
    );
    const pokemonList = await lastValueFrom(list$);
    await this.cache.set(CACHE_KEY, pokemonList);
    return pokemonList;
  }
}
