import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingsModule } from './embeddings/embeddings.module';

@Module({
  imports: [ConfigModule.forRoot(), EmbeddingsModule],
})
export class AppModule {}
