import { Cohere } from "https://esm.sh/langchain@0.0.117/llms/cohere";

export const llm = new Cohere({
  maxTokens: 20,
  apiKey: Deno.env.get("COHERE_API_KEY"),
});
