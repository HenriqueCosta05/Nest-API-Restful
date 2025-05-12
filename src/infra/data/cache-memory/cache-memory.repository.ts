import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";

export class RepositoryCacheMemory<
    TEntity extends Entity,
> extends Repository<TEntity> {
    
    protected readonly data: TEntity[] = [];
    constructor() {
        super();
        this.data = [];
    }
    async create(data: TEntity): Promise<TEntity> {
        data.createdAt = new Date();
        data.updatedAt = new Date();
        const count = this.data.push(data);
        return this.data[count - 1];
    }
    
    async deleteAll(): Promise<void> {
        this.data.splice(0, this.data.length);
    }

    get(): Promise<TEntity> {
        return Promise.resolve(this.data[0]);
    }

    getById(id: string): Promise<TEntity> {
        const entity = this.data.find((item) => item.id === id);
        if (!entity) {
            throw new Error("data not found");
        }
        return Promise.resolve(entity);
    }
    
    getAll(): Promise<TEntity[]> {
        return Promise.resolve(this.data);
    }
}