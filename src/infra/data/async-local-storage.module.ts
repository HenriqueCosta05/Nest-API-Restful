import { Module } from '@nestjs/common';
import { StoreSingleton } from './cache-memory/cache-store.repository';

@Module({
    providers: [StoreSingleton],
    exports: [StoreSingleton],
})
export class StoreSingletonModule {}