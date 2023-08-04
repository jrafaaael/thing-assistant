import { Module } from '@nestjs/common';
import { EmbeddingsModule } from './embeddings/embeddings.module';

@Module({
  imports: [EmbeddingsModule],
})
export class AppModule {}
