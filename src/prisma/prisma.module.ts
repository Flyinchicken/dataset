import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({})
export class PrismaModule {
    static forRoot(): DynamicModule {
        return {
            exports: ['prisma'],
            module: PrismaModule,
            global: true,
            providers: [
                {
                    provide: 'prisma',
                    useValue: new PrismaClient()
                }
            ]
        }
    }
}
