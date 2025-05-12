import { Injectable } from '@nestjs/common';
import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";
import { StoreSingleton } from './cache-store.repository';

@Injectable()
export class RepositoryCacheMemory<TEntity extends Entity> extends Repository<TEntity> {
    private readonly repositoryName: string;
    
    constructor(
        private readonly storeService: StoreSingleton,
        repositoryName?: string
    ) {
        super();
        this.repositoryName = repositoryName || this.constructor.name;
    }

    private getDataFromStore(): TEntity[] {
        return this.storeService.getEntities(this.repositoryName) as TEntity[];
    }
    
    async create(data: TEntity): Promise<TEntity> {
        const entities = this.getDataFromStore();
        
        data.createdAt = new Date();
        data.updatedAt = new Date();
        
        entities.push(data);
        
        return data;
    }
    
    async deleteAll(): Promise<void> {
        const entities = this.getDataFromStore();
        entities.splice(0, entities.length);
    }

    async get(): Promise<TEntity> {
        const entities = this.getDataFromStore();
        return entities[0];
    }

    async getById(id: string): Promise<TEntity> {
        const entities = this.getDataFromStore();
        const entity = entities.find((item) => item.id === id);
        
        if (!entity) {
            throw new Error("Entity not found");
        }
        
        return entity;
    }
    
    async getAll(): Promise<TEntity[]> {
        return this.getDataFromStore();
    }
}