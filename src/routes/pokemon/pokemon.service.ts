import { Inject, Injectable } from '@nestjs/common';
import { PokemonRepositoryService } from '@repository';

@Injectable()
export class PokemonService {
  @Inject()
  private readonly repository: PokemonRepositoryService;

  async list() {
    return this.repository.list();
  }

  async get(id: number) {
    return this.repository.get(id);
  }
}
