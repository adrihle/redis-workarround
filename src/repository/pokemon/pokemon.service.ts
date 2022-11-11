import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable()
export class PokemonRepositoryService {
  @Inject()
  private readonly http: HttpService;

  async list() {
    return this.http.get(BASE_URL).pipe(
      map((res) => res.data.results),
      catchError((err) => {
        throw err;
      }),
    );
  }

  async get(id: number) {
    return this.http.get(`${BASE_URL}/${id}`).pipe(
      map((res) => res.data.name),
      catchError((err) => {
        throw err;
      }),
    );
  }
}
