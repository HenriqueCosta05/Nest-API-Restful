import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
    abstract create(data: TEntity): Promise<TEntity>;
    abstract deleteAll(): Promise<void>;
    abstract getAll(): Promise<TEntity[]>;
}