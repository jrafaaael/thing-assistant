import { Controller, Post } from '@nestjs/common';

@Controller('generate-embeddings')
export class EmbeddingsController {
  @Post()
  async generateEmbeddings() {
    return [1, 2, 3, 4];
  }
}
