import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { DatasetService } from './dataset/dataset.service';
import { DatasetController } from './dataset/dataset.controller';

@Module({
  imports: [
    UsersModule,
    PrismaModule.forRoot()],
  providers: [DatasetService],
  controllers: [DatasetController],
})
export class AppModule { }
