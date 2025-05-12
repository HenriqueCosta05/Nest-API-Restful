import { Injectable } from '@nestjs/common';
import { Entity } from 'src/core/base/entity';

@Injectable()
export class StoreSingleton {
  private static instance: StoreSingleton;
  private entities: Record<string, Entity[]> = {};

  constructor() {
    if (!StoreSingleton.instance) {
      StoreSingleton.instance = this;
    }

    return StoreSingleton.instance;
  }

  getEntities(repositoryName: string): Entity[] {
    if (!this.entities[repositoryName]) {
      this.entities[repositoryName] = [];
    }
    return this.entities[repositoryName];
  }
}