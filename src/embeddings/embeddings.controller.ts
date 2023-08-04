import { Controller, Post } from '@nestjs/common';

@Controller('generate-embeddings')
export class EmbeddingsController {
  COHERE_API_KEY = process.env.COHERE_API_KEY;

  @Post()
  async generateEmbeddings() {
    const res = await fetch(`https://api.cohere.ai/v1/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        texts: ['hello', 'goodbye'],
        truncate: 'NONE',
      }),
    });

    const data = await res.json();

    console.log(data);
  }
}
